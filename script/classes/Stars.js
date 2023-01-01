class Stars {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        this.center = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }

        this.R = .1;
        this.r = Math.random() * (w / Math.SQRT2) + 50;
        this.w = Math.random() * .0001;
        this.phi = Math.random() * deg(360);

        this.color = '#FFFFFF';
    }

    spin() {
        this.phi -= this.w;
        this.x = Math.cos(this.phi) * this.r + this.center.x;
        this.y = Math.sin(this.phi) * this.r + this.center.y;
        this.draw();
    }

    draw() {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.R, 0, Math.PI * 2);
        c.closePath();
        c.fill();
    }
}