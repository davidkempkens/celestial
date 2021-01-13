// Defining the CelestialBody literal object
// Assigning properties

// Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color - Type
function CelestialBody(name, center, radius, distance, velocity, eccentricity, mass, color, type) {

    // Reallife Properties
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

    // Calculated Properties

    // RADIUS
    this.r = this.radius * scaleR;
    // this.r *= this.name === 'Sun' ? .2 : 1;

    // DISTANCE + center radius + planets radius
    this.d = this.distance ? (this.distance * scaleD) + (this.center.r + this.r) : this.distance;

    // VELOCITY 
    this.v = this.velocity * scaleV;

    // ECCENTRICITY
    this.a = 1;
    this.b = 1 - this.eccentricity;

    // Inital angle of orbit : degrees / radian - "0" degrees is the right side
    this.w = Math.random() * deg(360);

    // Inital postion oriented around the assigned center object
    this.x = this.center.x;
    this.y = this.center.y;

    // Distance to center using the pythagorean theorem
    this.dtc = Math.hypot((this.x - center.x), (this.y - center.y)) - (this.r - center.r);

    // flag for collision function
    this.isColliding = false;

    // DRAW CIRCLE ON CANVAS
    this.draw = function() {

        // draw the half of saturns rings first, so they appear behind Saturn
        // front = false
        this.saturnRings(false);

        // DRAW ACTUL BODY
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.closePath();
        c.fill();

        // draw the half of saturns rings after, so they appear infront of Saturn
        // front = true
        this.saturnRings(true);

        // DRAW SUNSHINE FOR STARS
        this.sunShine();

        // DRAW EVENT HORIZON FOR BLACK HOLES
        this.eventHorizon();
    }

    // RUN PHYSICS
    this.run = function() {

        // Increase inital value each frame by the v - attribute, scaled with the velocity of each body
        this.w += this.v;

        // Cosinus and sinus functions return values between -1 to 1
        // Those values multiplied with the d - attribute (magnifying the alternating values) + the centers radius are added to the center coordinates
        // a and b values are for the eccentricity of each orbit
        // center coord +   eccent * -1 < val < 1 *      + minimum distance to the center obj

        this.x = this.center.x + this.a * Math.cos(this.w) * this.d;
        this.y = this.center.y + this.b * Math.sin(this.w) * this.d;

        // Call the draw function to draw the body as filled circle on the canvas
        this.draw();
    }

    // drawing the orbit as lines 
    this.orbit = function() {

        let rotation = deg(0);

        c.beginPath();
        c.strokeStyle = '#626973';
        c.strokeStyle = this.color;
        c.lineWidth = 0.1 / scale;
        // ellipses center coords (x,y), (Major) x-radius, (Minor) y-radius, rotation, start, end
        c.ellipse(this.center.x, this.center.y, this.a * this.d, this.b * this.d, rotation, 0, Math.PI * 2);
        c.stroke();
        c.closePath();
    }

    this.saturnRings = function(front) {
        // doesn't execute if not Saturn object
        if (this.name === 'Saturn') {

            var rings = {
                rx: this.r * 0.5,
                ry: this.r * 2.5,
                angle: deg(80),

                start: front ? deg(270) : deg(90),
                end: front ? deg(90) : deg(270),
                // beige (Saturns color), grey, darker saturn base, background (dark blue),
                alpha: .1,
                color: [`rgba(217,202,173,.5)`, `rgba(89,89,89,.5)`, `rgba(166,155,141,.5)`, `rgba(5, 10, 16, .2)`],
                inner: [.9, .65, .45]
            }

            c.lineWidth = 0.2 / scale;

            c.beginPath();
            c.strokeStyle = rings.color[1];
            c.ellipse(this.x, this.y, rings.rx, rings.ry, rings.angle, rings.start, rings.end);
            c.stroke();
            c.closePath();

            for (let i = 0; i < rings.inner.length; i++) {
                c.beginPath();
                c.fillStyle = rings.color[i + 1];
                c.ellipse(this.x, this.y, rings.rx * rings.inner[i], rings.ry * rings.inner[i], rings.angle, rings.start, rings.end);
                c.fill();
                c.closePath();
            }
        }
    }

    this.sunShine = function() {
        if (this.type != 'Star') return;
        for (let i = 0; i < 10; i++) {
            // c.fillStyle = `rgba(242, 165, 22, ${.01 - .001 * i})`;
            c.fillStyle = this.color;
            c.globalAlpha = .01 - .001 * i;
            c.beginPath();
            c.arc(this.x, this.y, this.r + (this.r * i / 3), 0, Math.PI * 2);
            c.closePath();
            c.fill();
            c.globalAlpha = 1;
        }

    }

    this.eventHorizon = function() {
        if (this.type != 'Black Hole') return;
        var colBH = ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"];
        // var sizes = [1.075, 1.05, 1.025, 1.01, 1];
        var sizes = [1, .99, .98, .97, .96];
        for (let i = 0; i < sizes.length; i++) {
            c.fillStyle = colBH[i];
            c.beginPath();
            c.arc(this.x, this.y, this.r * sizes[i], 0, Math.PI * 2);
            c.closePath();
            c.fill();
        }
    }

    this.collision = function(other) {
        let distX = this.x - other.x;
        let distY = this.y - other.y;
        let distance = Math.hypot(distX, distY);
        this.isColliding = distance < (this.r + other.r);
    }

    // Draw Other Planet on mouse position
    this.compare = function(other) {
        let copy = Object.assign({}, other);
        copy.x = this.x;
        copy.y = this.y + this.r + (25 / scale) + copy.r;

        // DRAW THIS RADIUS AS BAR ABOVE THIS BODY
        c.fillStyle = this.color;
        c.fillRect(this.x - this.r, this.y - this.r - (10 / scale), this.r * 2, 2 / scale);

        if (this == other) return;
        // DRAW Other Body under this Body
        c.fillStyle = copy.color;
        c.fillRect(this.x - copy.r, (this.y + this.r) + (10 / scale), copy.r * 2, 2 / scale);
        copy.draw()
    }

    this.info = function() {

        var t = [
            `${this.name} ${this.symbol} `, // Display Symbols
            `\u2192 ${formatNumber(this.distance * 1e6)} km `, // Display Distance
            `${formatNumber(this.velocity)} km/s `, // Display Velocity
            `${this.type} Mass: ${formatNumber(this.mass.toExponential(0))} kg` // Display Type
        ]
        drawText(t, this, 13, true);

        let b = {
            x: this.x - this.r * 2,
            y: this.y - this.r - (25 / scale),
            r: this.r,
            color: this.color
        }
        drawText(`\u2205 ${formatNumber(this.radius * 2e6)} km`, b, 13, true);

    }

    this.n = function() {
        drawText(this.name, this, 13, true);
    }
}

// Symbols as Unicode for the planets in the solar system
var symbols = {
    mercury: '\u263F',
    venus: '\u2640',
    earth: '\u{1F728}',
    mars: '\u2642',
    jupiter: '\u2643',
    saturn: '\u2644',
    uranus: '\u26E2',
    neptune: '\u2646',
    ceres: '\u26B3',
    pluto: '\u2647',
    moon: '\u263D',
    sun: '\u{1F31E}',
    poop: '\u{1F4A9}',
    rocket: '\u{1F680}',
    ymcmb: '\u{1F4AF}'
}

function Star(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;

    this.center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    }

    this.r = .1;
    this.d = Math.random() * (w / Math.SQRT2) + 50;
    this.v = Math.random() * .0001;
    this.w = Math.random() * deg(360);

    this.color = '#FFFFFF';

    this.spin = function() {

        // this.center = {
        //     x: canvas.width / 2,
        //     y: canvas.height / 2
        // }

        this.w -= this.v;

        this.x = Math.cos(this.w) * this.d + this.center.x;
        this.y = Math.sin(this.w) * this.d + this.center.y;

        this.draw();
    }

    this.draw = function() {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.closePath();
        c.fill();
    }
}

// INITIALIZES ASTEROIDS AS CELESTIAL BODY OBJECTS AND RETURNS ARRAY OF ASTEROIDS
// count - name - center - min. radius(Mio km) - max. radius(Mio km)- min. distance(Mio km) - max. distance(Mio km)
// - min. velocity(km/s) - max. velocity(km/s) - eccentricity - eass - color - type
function asteroidFactory(count, name, center, minRadius, maxRadius, minDistance, maxDistance, minVelocity, maxVelocity, eccentricity, mass, color, type) {
    let belt = [];
    for (let i = 0; i < count; i++) {
        let n = i + ". " + name;
        let r = (minRadius + (Math.random() * maxRadius)) * 500;
        let d = minDistance + (Math.random() * maxDistance);
        let v = minVelocity + (Math.random() * maxVelocity);
        let e = eccentricity * Math.random();
        let m = mass;
        let col = color;
        let t = type;
        // Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color
        belt.push(new CelestialBody(name, center, r, d, v, e, m, col, t));
    }
    return belt;
}