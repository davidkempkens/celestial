class Particle extends CelestialBody {

    constructor(name, center, radius, distance, velocity, eccentricity, mass, color, type) {
        super(name, center, radius, distance, velocity, eccentricity, mass, color, type);
    }

    tail(w, l) {
        let rotation = deg(0);
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = w;
        // ellipses center coords (x,y), (Major) x-radius, (Minor) y-radius, rotation, start, end
        c.ellipse(this.center.x, this.center.y, this.a * this.d, this.b * this.d, rotation, this.w - deg(l), this.w);
        c.stroke();
        c.closePath();
    }
}