class Sun extends CelestialBody {

    draw() {
        super.draw();
        this.sunShine()
    }

    sunShine() {
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
}