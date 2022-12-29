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
        let col = this.color;
        this.color = 'white';
        this.draw();
        this.color = col;
        this.R /= 2;
    }
}