class Star {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        this.center = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }

        this.r = .1;
        this.d = Math.random() * (w / Math.SQRT2) + 50;
        this.v = Math.random() * .0001;
        this.w = Math.random() * deg(360);

        this.color = '#FFFFFF';
    }

    spin() {
            this.w -= this.v;
            this.x = Math.cos(this.w) * this.d + this.center.x;
            this.y = Math.sin(this.w) * this.d + this.center.y;
            this.draw();
        }

    draw() {
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            c.closePath();
            c.fill();
        }
}