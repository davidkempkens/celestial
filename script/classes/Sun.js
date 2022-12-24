class Sun extends CelestialBody {

    constructor(name, center, radius, periapsis, apoapsis, mass, color, type) {
        super(name, center, radius, periapsis, apoapsis, mass, color, type);
        this.r = 26600 * LY;
        this.v = 251000;
    }

    run() {
        this.x = this.center.x;
        this.y = this.center.y;
        this.draw();
    }

    draw() {
        super.draw();
        this.sunShine()
    }

    sunShine() {
        for (let i = 0; i < 10; i++) {
            c.fillStyle = this.color;
            c.globalAlpha = .01 - .001 * i;
            c.beginPath();
            c.arc(this.x, this.y, this.R + (this.R * i / 3), 0, Math.PI * 2);
            c.closePath();
            c.fill();
            c.globalAlpha = 1;
        }
    }
}