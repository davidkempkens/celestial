class Satellite extends Planet {

    draw() {
        c.drawImage(sat, this.x, this.y - this.R / 2, this.R, this.R);
    }
}