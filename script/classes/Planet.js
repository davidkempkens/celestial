class Planet extends CelestialBody {

    constructor(name, center, radius, periapsis, apoapsis, mass, color, type) {
        super(name, center, radius, 0, 0, mass, color, type);
        this.M = center.m;
        this.m = mass;
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
        this.phi = isNaN(initialDeg[this.name.toLowerCase()])
            ? Math.random() * deg(360)
            : deg(initialDeg[this.name.toLowerCase()]);
        this.r = this.p / (1 + this.eps * Math.cos(this.phi));

        // Orbital velocity
        this.v = Math.sqrt(G * (this.M + this.m) * ((2 / this.r) - (1 / this.a)));

        // Angular velocity
        this.w = this.v / this.r;

        // Cartesion coordinates
        this.x = this.r * Math.cos(this.phi);
        this.y = this.r * Math.sin(this.phi);

        // flag for collision function
        this.isColliding = false;
    }

    run() {
        // Physics for orbiting Bodies - Update angular velocity
        this.v = Math.sqrt(G * (this.M + this.m) * ((2 / this.r) - (1 / this.a)));
        this.r = this.p / (1 + this.eps * Math.cos(this.phi));
        this.w = this.v / this.r
        this.phi -= this.w * dt / fps;
        this.x = this.center.x + this.r * Math.cos(this.phi);
        this.y = this.center.y + this.r * Math.sin(this.phi);

        // Call the draw function to draw the body as filled circle on the canvas
        this.draw();
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