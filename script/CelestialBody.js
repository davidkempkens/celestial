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
    this.satelites = [];

    // Calculated Properties
    // RADIUS
    this.r = this.radius * scaleR;

    // DISTANCE + center radius + planets radius
    this.d = this.distance ? (this.distance * scaleD) + (this.center.r + this.r) : this.distance * scaleD;

    // VELOCITY
    this.v = this.velocity * scaleV;
    if (this.type != 'Photon' && this.distance != 0) this.v = (this.velocity / this.distance) * scaleV;
    // ECCENTRICITY
    this.a = 1;
    this.b = 1 - this.eccentricity;

    // Inital angle of orbit : degrees / radian - "0" degrees is the right side
    this.w = Math.random() * deg(360);

    // Inital postion oriented around the assigned center object
    this.x = this.center.x + this.a * Math.cos(this.w) * this.d;
    this.y = this.center.y + this.b * Math.sin(this.w) * this.d;

    // Distance to center using the pythagorean theorem
    this.dtc = Math.hypot((this.x - center.x), (this.y - center.y)) - (this.r - center.r);

    // flag for collision function
    this.isColliding = false;
    // Last position
    this._x = this.x;
    this._y = this.y;

    // DRAW CIRCLE ON CANVAS
    this.draw = function() {

        // draw the half of saturns rings first, so they appear behind Saturn
        // front = false
        this.saturnRings(false);

        // DRAW ACTUAL BODY
        if (this.type != 'Probe') {
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            c.closePath();
            c.fill();
        } else {
            c.drawImage(img, this.x, this.y - this.r / 2, this.r, this.r);
        }
        // draw the half of saturns rings after, so they appear infront of Saturn
        // front = true
        this.saturnRings(true);

        // DRAW SUNSHINE FOR STARS
        this.sunShine();

        // DRAW EVENT HORIZON FOR BLACK HOLES
        this.eventHorizon();
        this.vortex();
    }

    // RUN PHYSICS
    this.run = function() {
        // Save last postion
        this._x = this.x;
        this._y = this.y;

        this.rescale();
        if (this.type == 'Probe' || this.type == 'Photon') {
            // Physics for Bodies flying in a straight line
            this.d += this.v;
            this.x = this.center.x + this.center.r + this.d;
            this.y = this.center.y;
            this.flightPath();
        } else {
            // Physics for orbiting Bodies
            this.w += this.v;
            this.x = this.center.x + this.a * Math.cos(this.w) * this.d;
            this.y = this.center.y + this.b * Math.sin(this.w) * this.d;
        }
        // Call the draw function to draw the body as filled circle on the canvas
        this.draw();
    }
    this.rescale = function() {
        // RESCALE TIME + DISTANCES + RADIUS + VELOCITIES
        this.r = this.radius * scaleR;
        // if (this.type != 'Photon' && this.type != 'Probe') this.d = this.distance ? (this.distance * scaleD) + (this.center.r + this.r) : this.distance * scaleD;
        scaleV = (1 / 60e6) * scaleT;
        if (this.type != 'Photon' && this.distance != 0) this.v = (this.velocity / this.distance) * scaleV;
        else this.v = this.velocity * scaleV;

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
            c.fillStyle = this.color;
            c.globalAlpha = .01 - .001 * i;
            c.beginPath();
            c.arc(this.x, this.y, this.r + (this.r * i / 3), 0, Math.PI * 2);
            c.closePath();
            c.fill();
            c.globalAlpha = 1;
        }

    }
    this.colBH = ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"];

    this.eventHorizon = function() {
        if (this.type != 'Black Hole') return;
        for (let i = 0; i < this.colBH.length; i++) {
            c.fillStyle = this.colBH[i];
            c.beginPath();
            this.r * 1 - i * 1e-1;
            c.arc(this.x, this.y, this.r * (1 - (i * 1e-2)), 0, Math.PI * 2);
            c.closePath();
            c.fill();
        }
    }

    // PARTICLE PROPERTIES
    this.particle = {
        count: 300,
        name: 'Particle of ' + this.name,
        minR: this.r * 1e-6,
        maxR: this.r * 1e-5,
        minD: this.r * .01,
        maxD: this.r * .3,
        minV: 0,
        maxV: C * .4,
        minE: .0,
        maxE: .0,
        m: 1e10,
        color: "#000000",
        colors: ["#FFFFFF", "#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"],
        t: 'Particle'
    };

    this.vortex = function() {
        if (this.type != 'Black Hole') return;
        let minSpeed = (this.particle.minV / this.particle.minD) * scaleV;
        let maxSpeed = (this.particle.maxV / this.particle.maxD) * scaleV;
        let rate = (maxSpeed - minSpeed) * .1;
        particles.forEach(p => {

            if (p.v <= maxSpeed) {
                p.v += rate;
                let interval = (maxSpeed - minSpeed) / this.particle.colors.length;
                let accumulated = p.v - minSpeed;
                let idx = this.particle.colors.length - Math.floor(accumulated / interval)
                p.color = this.particle.colors[idx];
            }
            p.d -= p.d / 3000;
            if (p.d < p.center.r) {
                let i = particles.indexOf(p);
                if (i > -1) particles.splice(i, 1);
                let newParticle = asteroidFactory(1, this.particle.name, this, this.particle.minR, this.particle.maxR, this.particle.minD, this.particle.maxD, this.particle.minV, this.particle.maxV, this.particle.minE, this.particle.maxE, this.particle.m, this.particle.color, this.particle.t);
                newParticle.forEach(nP => particles.push(nP));

            }
            p.tail(p.r, 10);
            p.run();
        });
    }

    this.tail = function(w, l) {
        let rotation = deg(0);
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = w;
        // ellipses center coords (x,y), (Major) x-radius, (Minor) y-radius, rotation, start, end
        c.ellipse(this.center.x, this.center.y, this.a * this.d, this.b * this.d, rotation, this.w - deg(l), this.w);
        c.stroke();
        c.closePath();
    }

    this.radioWave = function() {
        if (this.type != 'Photon') return;
        let d = this.d % .5;
        let wave = {
            x: this.x - d,
            y: this.y,
            h: this.r,
            line: 1 / scale,
            i: .005,
            m: 100
        }

        c.beginPath();
        c.strokeStyle = 'red';
        c.lineWidth = wave.line;
        c.moveTo(wave.x, wave.y);
        for (let i = 0; i < d; i += wave.i) {
            c.moveTo(wave.x + i - wave.i, wave.y + Math.sin((i - wave.i) * wave.m) * wave.h);
            c.lineTo(wave.x + i, wave.y + Math.sin(i * wave.m) * wave.h);
        }
        c.closePath();
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'blue';
        c.lineWidth = wave.line;
        c.moveTo(wave.x, wave.y);
        for (let i = 0; i < d; i += wave.i) {
            c.moveTo(wave.x + i - wave.i, wave.y - Math.sin((i - wave.i) * wave.m) * wave.h);
            c.lineTo(wave.x + i, wave.y - Math.sin(i * wave.m) * wave.h);
        }
        c.closePath();
        c.stroke();

    }

    this.flightPath = function() {

        // DRAW LINE TO SHOW DIRECTION
        if (!this.isColliding) return;
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = .3 / scale;
        c.moveTo(this.center.x + this.center.r, this.center.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();

        this.radioWave();
    }

    this.hover = function() {
        this.r *= 5;
        this.draw();
        this.r = this.radius * scaleR;
    }

    this.collision = function(other) {
        let distX = this.x - other.x;
        let distY = this.y - other.y;
        let distance = Math.hypot(distX, distY);
        this.isColliding = distance < (this.r + other.r);
    }

    this.compare = function(other) {

        // DRAW LINE TO SHOW DIRECTION
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = .3 / scale;
        c.moveTo(this.x, this.y);
        c.lineTo(this.center.x, this.center.y);
        c.stroke();

        // Draw this body's diameter above this body
        c.fillStyle = this.color;
        c.fillRect(this.x - this.r, this.y - this.r - (10 / scale), this.r * 2, 2 / scale);

        // Draw Compares bodies
        let copies = other.map(o => ({...o }));
        for (let i = 0; i < copies.length; i++) {
            // Copy other body to alter the x,y postion, without changing the orbit of the other body
            copies[i].x = i < 1 ? this.x : copies[i - 1].x;
            copies[i].y = i < 1 ? this.y + this.r + (25 / scale) + copies[i].r : copies[i - 1].y + copies[i - 1].r + ((25 / scale)) + copies[i].r;

            // DRAW Other Body under this Body or below the other 'other' bodies
            c.fillStyle = copies[i].color;
            copies[i].draw();
            if (copies.length > 2) continue;
            if (i < 1) c.fillRect(this.x - copies[i].r, (this.y + this.r) + (10 / scale), copies[i].r * 2, 2 / scale);
            else c.fillRect(copies[i - 1].x - copies[i].r, (copies[i - 1].y + copies[i - 1].r) + ((10 / scale) * i), copies[i].r * 2, 2 / scale);
        }
    }

    this.info = function() {

        var textAbove = [`\u2205 ${formatNumber(this.radius * 2e6)} km`]; // DEFAULT TEXT ABOVE BODY IS DIAMETER
        var textAside = [
            `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
            `${formatNumber(this.velocity)} km/s `, // Display Velocity
            `\u2192 ${formatNumber(this.distance * 1e6)} km `, // Display Distance
            `Mass: ${formatNumber(this.mass.toExponential(0))} kg` // Display Type
        ];

        if (this.type == 'Probe') {
            textAbove = [`\u2192 ${(this.d / 150).toPrecision(14)} AU`];
            textAside = [
                `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
                `${formatNumber(this.velocity)} km/s `, // Display Velocity
            ];
        } else if (this.type == 'Photon') {
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

    this.n = function() {
        drawText(this.name, this.x + this.r, this.y, this.color, 13);
    }
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
function asteroidFactory(count, name, center, minRadius, maxRadius, minDistance, maxDistance, minVelocity, maxVelocity, minEccentricity, maxEccentricity, mass, color, type) {
    let belt = [];
    for (let i = 0; i < count; i++) {
        let n = i + ". " + name;
        let r = (minRadius + (Math.random() * (maxRadius - minRadius))) * 500;
        let d = minDistance + (Math.random() * (maxDistance - minDistance));
        let v = minVelocity + (Math.random() * (maxVelocity - minVelocity));
        let e = minEccentricity + (Math.random() * (maxEccentricity - minEccentricity));
        let m = mass;
        let col = color;
        let t = type;
        // Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color - Type
        belt.push(new CelestialBody(n, center, r, d, v, e, m, col, t));
    }
    return belt;
}

// INITIALIZES STARS AS STAR OBJECTS AND RETURNS ARRAY OF STARS - Pass amount as argument
function starsFactory(amount) {
    let stars = [];
    for (let i = 0; i < amount; i++) {
        stars.push(new Star(canvas.width, canvas.height));
    }
    return stars;
}