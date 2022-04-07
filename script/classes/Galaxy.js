class Galaxy extends CelestialBody {

    constructor(name, center, radius, distance, velocity, eccentricity, mass, color, type) {
        super(name, center, radius, distance, velocity, eccentricity, mass, color, type);
    }


    run() {
        super.rescale();
        this.x = this.center.x;
        this.y = this.center.y;
        this.draw();
    }

    draw() {
        let rotation = deg(0);

        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = 0.3 / scale;
        // ellipses center coords (x,y), (Major) x-radius, (Minor) y-radius, rotation, start, end
        c.ellipse(this.center.x, this.center.y, this.a * this.r, this.b * this.r, rotation, 0, Math.PI * 2);
        c.stroke();
        c.closePath();
    }

    drawName() {
        // drawText(this.name, this.x + this.r, this.y, this.color, 13);
    }

    info() {
        // Draw this body's diameter above this body
        c.fillStyle = this.color;
        c.fillRect(this.x - this.r, this.y - this.r - (10 / scale), this.r * 2, 2 / scale);

        let textAbove = [`\u2205 ${formatNumber(toLy(this.radius * 2))} ly`]; // DEFAULT TEXT ABOVE BODY IS DIAMETER
        let textAside = [
            `${this.name}`, // Display Symbols
            `Mass: ${formatNumber(this.mass.toExponential(0))} kg` // Display Type
        ];

        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.r * 2, this.y - this.r - (25 / scale), this.color, 13);
        drawText(textAside, this.x + this.r, this.y, this.color, 13);
    }
}