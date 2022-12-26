class FlyingBody extends CelestialBody {
    constructor(name, center, radius, distance, veloctiy, mass, color, type) {
        super(name, center, radius, distance, veloctiy, mass, color, type);
    }

    run() {

        // Physics for Bodies flying in a straight line
        this.d += this.v * dt / fps;
        this.x = this.center.x + this.d;
        this.y = this.center.y;
    }

    flightPath() {
        // DRAW LINE TO SHOW DIRECTION
        if (!this.isColliding) return;
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = .3 / scale;
        c.moveTo(this.center.x + this.center.R, this.center.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

    info() {
        let textAside = [
            `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
            `${formatNumber(this.v)} km/s `, // Display Velocity
        ];
        // CALL TEXT FUNCTION
        drawText(textAside, this.x + this.R, this.y, this.color, 13);
    }
}