class FlyingBody extends CelestialBody {

    run() {
        this.rescale();

        // Physics for Bodies flying in a straight line
        this.d += this.v;
        this.x = this.center.x + this.d;
        this.y = this.center.y;
    }

    flightPath() {
        // DRAW LINE TO SHOW DIRECTION
        if (!this.isColliding) return;
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = .3 / scale;
        c.moveTo(this.center.x + this.center.r, this.center.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

    rescale() {
        // RESCALE TIME + DISTANCES + RADIUS + VELOCITIES
        this.r = this.radius * scaleR;
        scaleV = (1 / 60e6) * scaleT;
        this.v = this.velocity * scaleV;
    }

    info() {
        let textAside = [
            `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
            `${formatNumber(this.v)} km/s `, // Display Velocity
        ];
        // CALL TEXT FUNCTION
        drawText(textAside, this.x + this.r, this.y, this.color, 13);
    }
}