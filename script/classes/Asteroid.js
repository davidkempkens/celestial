class Asteroid extends Planet {

    tail(w, l) {
        let rotation = deg(0);
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = w;
        // ellipses center coords (x,y), (Major) x-radius, (Minor) y-radius, rotation, start, end
        c.ellipse(this.center.x - this.e, this.center.y, this.a, this.b, rotation, this.phi, this.phi + deg(l));
        c.stroke();
        c.closePath();
    }

    hover() {
        this.R *= 2;
        this.draw();
        this.R /= 2;
    }

    shine() {
        for (let i = 0; i < 10; i++) {
            c.fillStyle = this.color;
            c.globalAlpha = .01 - .001 * i;
            c.beginPath();
            c.arc(this.x, this.y, this.R + (this.R * 5 * i / 3), 0, Math.PI * 2);
            c.closePath();
            c.fill();
            c.globalAlpha = 1;
        }
    }
}