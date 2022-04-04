class Probe extends FlyingBody {

    run() {
        super.run();
        this.draw();
    }

    draw() {
        c.drawImage(img, this.x, this.y - this.r / 2, this.r, this.r);
        this.flightPath();
    }

    info() {
        super.info()
            let textAbove = [`\u2192 ${(this.d / 150).toPrecision(14)} AU`];
        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.r * 2, this.y - this.r - (25 / scale), this.color, 13);
    }
}