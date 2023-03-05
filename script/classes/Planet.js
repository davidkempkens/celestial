/**
* Create a Planet-like body orbiting its center body
* @param {String} name Name
* @param {String} center The name of the center body.
* @param {Number} radius The Radius of the body in meters (m).
* @param {Number} periapsis Nearest point point in the orbit to its center body in meters (m).
* @param {Number} apoapsis Farthest point point in the orbit to its center body in meters (m).
* @param {Number} mass Mass of the body in Kilogramm (kg).
* @param {String} color Color as String, e.g.: #0F2D23, 'white', 'rgb(0,255,0)'
* @param {String} type Type of Planet-like body, e.g. Planet, Dwarf, Asteroid
* @returns {Planet} planet Returns a Planet Object.
*/
class Planet extends CelestialBody {

    constructor(name, center, radius, periapsis, apoapsis, mass, color, type, symbol, phi) {
        super(name, center, radius, periapsis + apoapsis / 2, Math.sqrt(G * (center.m + mass) * ((1 / periapsis + apoapsis / 2))), mass, color, type, symbol, phi);
        this.rp = periapsis;
        this.ra = apoapsis;

        // Semi-major axis
        this.a = (this.rp + this.ra) / 2;

        // Energy
        this.E = -G * this.M * this.m / (2 * this.a);

        // Angular momentum
        this.L = Math.sqrt(2 * G * this.M * this.m ** 2 * ((this.rp * this.ra) / (this.ra + this.rp)));

        // Parameter p, k, eps
        this.p = this.L ** 2 / (G * this.M * this.m ** 2);
        this.k = 2 * this.m * this.L ** 2 / (G * this.M * this.m ** 2) ** 2;

        // Numerical eccentricity
        this.eps = Math.sqrt(1 + this.k * this.E);

        // Semi-minor axis
        this.b = this.a * Math.sqrt(1 - this.eps ** 2);

        // Linear eccentricity
        this.e = Math.sqrt(this.a ** 2 - this.b ** 2);

        // Polar coordinates
        this.r = this.p / (1 + this.eps * Math.cos(this.phi));

        // Orbital velocity
        this.v = Math.sqrt(G * (this.M + this.m) * ((2 / this.r) - (1 / this.a)));

        this.vx = this.v * Math.cos(this.phi + Math.PI / 2)
        this.vy = this.v * Math.sin(this.phi + Math.PI / 2)
        // Angular velocity
        this.w = this.v / this.r;

        // Cartesion coordinates
        this.x = this.r * Math.cos(this.phi);
        this.y = this.r * Math.sin(this.phi);

        // flag for collision function
        this.isColliding = false;
    }

    run() {

        // Recalc all parameter, in case something changes
        this.a = (this.rp + this.ra) / 2;
        this.E = -G * this.M * this.m / (2 * this.a);
        this.L = Math.sqrt(2 * G * this.M * this.m ** 2 * ((this.rp * this.ra) / (this.ra + this.rp)));
        this.p = this.L ** 2 / (G * this.M * this.m ** 2);
        this.k = 2 * this.m * this.L ** 2 / (G * this.M * this.m ** 2) ** 2;
        this.eps = Math.sqrt(1 + this.k * this.E);
        this.b = this.a * Math.sqrt(1 - this.eps ** 2);
        this.e = Math.sqrt(this.a ** 2 - this.b ** 2);

        // Physics for orbiting Bodies - Update angular velocity
        this.v = Math.sqrt(G * (this.M + this.m) * ((2 / this.r) - (1 / this.a)));
        this.r = this.p / (1 + this.eps * Math.cos(this.phi));
        this.w = this.v / this.r
        this.phi -= this.w * dt / fps;
        this.phi %= Math.PI * 2;
        this.x = this.center.x + this.r * Math.cos(this.phi);
        this.y = this.center.y + this.r * Math.sin(this.phi);

        // Call the draw function to draw the body as filled circle on the canvas
        this.draw();
    }

    updateAcceleration(other) {

        let rx = other.x - this.x
        let ry = other.y - this.y
        let theta = Math.atan2(ry, rx)

        let r = Math.sqrt(rx ** 2 + ry ** 2 + softening)

        if (gravityOn) {
            this.ax += (G * other.m) / (r ** 2) * Math.cos(theta)
            this.ay += (G * other.m) / (r ** 2) * Math.sin(theta)
        } else {
            this.ax = 0
            this.ay = 0
        }

        this.a = Math.sqrt(this.ax ** 2 + this.ay ** 2)

        this.fx = this.ax * this.m
        this.fy = this.ay * this.m

        this.f = Math.sqrt(this.fx ** 2 + this.fy ** 2)
    }

    updateVelocitiy() {

        if (this.v > C) {
            this.color = 'cyan'
            let theta = Math.atan2(this.vy, this.vx)
            this.vx = C * Math.cos(theta)
            this.vy = C * Math.sin(theta)
        } else {
            this.vx += this.ax * dt
            this.vy += this.ay * dt
        }
        this.v = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    }

    updatePosition() {
        this.x += this.vx * dt
        this.y += this.vy * dt
    }

    drawVelocityVector() {
        drawArrow(this, { x: this.x + this.vx, y: this.y + this.vy }, 50 / scale, 'green')
    }

    drawAccelerationVector() {
        drawArrow(this, { x: this.x + this.ax, y: this.y + this.ay }, 50 / scale, 'pink')
    }

    drawForceVector() {
        drawArrow(this, { x: this.x + this.fx, y: this.y + this.fy }, 50 / scale, 'red')
    }
    draw() {

        // draw the half of Saturn's rings first, so they appear behind Saturn
        // front = false
        if (this.name === 'Saturn') this.saturnRings(false);
        super.draw();
        // draw the half of Saturn's rings after, so they appear in front of Saturn
        // front = true
        if (this.name === 'Saturn') this.saturnRings(true);
    }

    saturnRings(front) {

        const rings = {
            rx: this.R * 0.5,
            ry: this.R * 2.5,
            angle: deg(80),

            start: front ? deg(270) : deg(90),
            end: front ? deg(90) : deg(270),
            // beige (Saturn's color), grey, darker saturn base, background (dark blue),
            alpha: .1,
            color: [`rgba(217, 202, 173, .5)`, `rgba(89, 89, 89, .5)`, `rgba(166, 155, 141, .5)`, `rgba(5, 10, 16, .2)`],
            inner: [.9, .65, .45]
        };

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