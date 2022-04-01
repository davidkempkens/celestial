class FlyingBody extends CelestialBody {

    run() {
        this.rescale();

        // Physics for Bodies flying in a straight line
        this.d += this.v;
        this.x = this.center.x + this.center.r + this.d;
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
}