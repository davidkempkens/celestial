class Probe extends FlyingBody {

    run() {
        super.run();
        this.draw();
    }

    draw() {
        c.drawImage(img, this.x, this.y - this.r / 2, this.r, this.r);
        this.flightPath();
    }
}