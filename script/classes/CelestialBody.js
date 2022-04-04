// Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color - Type
class CelestialBody {
    constructor(name, center, radius, distance, velocity, eccentricity, mass, color, type) {

        // Real life Properties
        this.name = name;
        this.center = center;
        this.radius = radius;
        this.distance = distance;
        this.velocity = velocity;
        this.eccentricity = eccentricity;
        this.mass = mass;
        this.color = color;
        this.type = type;
        this.symbol = symbols[name.toLowerCase()] || '';
        this.satelites = [];

        // Calculated Properties
        // RADIUS
        this.r = this.radius * scaleR;

        // DISTANCE + center radius + planets radius
        this.d = this.distance ? (this.distance * scaleD) + (this.center.r + this.r) : this.distance * scaleD;

        // VELOCITY
        this.v = this.velocity * scaleV;

        // ECCENTRICITY
        this.a = 1;
        this.b = 1 - this.eccentricity;

        // Initial angle of orbit : degrees / radian - "0" degrees is the right side
        this.w = isNaN(initialDeg[this.name.toLowerCase()])
            ? Math.random() * deg(360)
            : deg(initialDeg[this.name.toLowerCase()]);

        // Initial position oriented around the assigned center object
        this.x = this.center.x + this.a * Math.cos(this.w) * this.d;
        this.y = this.center.y + this.b * Math.sin(this.w) * this.d;

        // flag for collision function
        this.isColliding = false;

    }

    run() {
        this.rescale();

        // Physics for orbiting Bodies
        this.w -= this.v;
        this.w %= Math.PI * 2;
        this.x = this.center.x + this.a * Math.cos(this.w) * this.d;
        this.y = this.center.y + this.b * Math.sin(this.w) * this.d;

        // Call the draw function to draw the body as filled circle on the canvas
        this.draw();
    }

    draw() {
        // DRAW ACTUAL BODY
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.closePath();
        c.fill();
    }

    compare(other) {

        // Draw this body's diameter above this body
        c.fillStyle = this.color;
        c.fillRect(this.x - this.r, this.y - this.r - (10 / scale), this.r * 2, 2 / scale);

        // Draw Compares classes
        let copies = other
            .filter(o => o.name !== this.name)
            .map(o => o.copy(o));
        for (let i = 0; i < copies.length; i++) {

            // Copy other body to alter the x,y position, without changing the orbit of the other body
            copies[i].x = i < 1 ? this.x : copies[i - 1].x;
            copies[i].y = i < 1 ? this.y + this.r + (25 / scale) + copies[i].r : copies[i - 1].y + copies[i - 1].r + ((25 / scale)) + copies[i].r;

            // DRAW Other Body under this Body or below the other 'other' classes
            c.fillStyle = copies[i].color;
            copies[i].draw();
            if (copies.length > 2) continue;
            if (i < 1) c.fillRect(this.x - copies[i].r, (this.y + this.r) + (10 / scale), copies[i].r * 2, 2 / scale);
            else c.fillRect(copies[i - 1].x - copies[i].r, (copies[i - 1].y + copies[i - 1].r) + ((10 / scale) * i), copies[i].r * 2, 2 / scale);
        }
    }

    drawName() {
        drawText(this.name, this.x + this.r, this.y, this.color, 13);
    }

    hover() {
        this.r *= 5;
        this.draw();
        this.r = this.radius * scaleR;
    }

    collision(other) {
        let distX = this.x - other.x;
        let distY = this.y - other.y;
        let distance = Math.hypot(distX, distY);
        this.isColliding = distance < (this.r + other.r);
    }

    rescale() {
        // RESCALE TIME + DISTANCES + RADIUS + VELOCITIES
        this.r = this.radius * scaleR;
        scaleV = (1 / 60e6) * scaleT;
        if (this.distance !== 0) this.v = (this.velocity / this.distance) * scaleV;
        else this.v = this.velocity * scaleV;
    }

    drawOrbit() {

        let rotation = deg(0);

        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = 0.1 / scale;
        // ellipses center coords (x,y), (Major) x-radius, (Minor) y-radius, rotation, start, end
        c.ellipse(this.center.x, this.center.y, this.a * this.d, this.b * this.d, rotation, 0, Math.PI * 2);
        c.stroke();
        c.closePath();
    }

    info() {

        let textAbove = [`\u2205 ${formatNumber(this.radius * 2e6)} km`]; // DEFAULT TEXT ABOVE BODY IS DIAMETER
        let textAside = [
            `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
            `${formatNumber(this.velocity)} km/s `, // Display Velocity
            `\u2192 ${formatNumber(this.distance * 1e6)} km `, // Display Distance
            `Mass: ${formatNumber(this.mass.toExponential(0))} kg` // Display Type
        ];

        if (this.type === 'Probe') {
            textAbove = [`\u2192 ${(this.d / 150).toPrecision(14)} AU`];
            textAside = [
                `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
                `${formatNumber(this.velocity)} km/s `, // Display Velocity
            ];
        } else if (this.type === 'Photon') {
            textAbove = [`\u2192 ${formatNumber(this.d * 1e6)} km`];
            textAside = [
                `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
                `${formatNumber(this.velocity)} km/s `, // Display Velocity
            ];
        }

        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.r * 2, this.y - this.r - (25 / scale), this.color, 13);
        drawText(textAside, this.x + this.r, this.y, this.color, 13);
    }

    copy(copy) {
        return new CelestialBody(copy.name, copy.center, copy.radius, copy.distance, copy.velocity, copy.eccentricity, copy.mass, copy.color, copy.type);
    }
}

