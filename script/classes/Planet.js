class Planet extends CelestialBody {

    constructor(name, center, radius, periapsis, apoapsis, mass, color, type) {
        super(name, center, radius, periapsis, apoapsis, mass, color, type);
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