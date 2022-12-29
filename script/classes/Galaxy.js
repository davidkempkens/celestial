/** 
* Create a Galaxy
* @param {String} name Name
* @param {String} center The name of the center body.
* @param {Number} radius The Radius of the body in meters (m).
* @param {Number} distance Distance to the other body in meters (m).
* @param {Number} velocity Velocity relative to its center body in meters per second (m/s).
* @param {Number} mass Mass of the body in Kilogramm (kg).
* @param {String} color Color as String, e.g.: #0F2D23, 'white', 'rgb(0,255,0)'
* @param {String} type Type of the body, e.g. Planet, Dwarf, Asteroid
* @returns {Galaxy} body Returns an Galaxy Object.
*/
class Galaxy extends CelestialBody {

    constructor(name, center, radius, distance, velocity, mass, color, type) {
        super(name, center, radius, distance, velocity, mass, color, type);
    }


    run() {
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
        c.ellipse(this.center.x, this.center.y, this.R, this.R, rotation, 0, Math.PI * 2);
        c.stroke();
        c.closePath();
    }

    drawName() {
        // drawText(this.name, this.x + this.r, this.y, this.color, 13);
    }

    info() {
        // Draw this body's diameter above this body
        c.fillStyle = this.color;
        c.fillRect(this.x - this.R, this.y - this.R - (10 / scale), this.R * 2, 2 / scale);

        let textAbove = [`\u2205 ${formatNumber(toLy(this.R * 2))} ly`]; // DEFAULT TEXT ABOVE BODY IS DIAMETER
        let textAside = [
            `${this.name}`, // Display Symbols
            `Mass: ${formatNumber(this.m.toExponential(2))} kg` // Display Type
        ];

        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.R * 2, this.y - this.R - (25 / scale), this.color, 13);
        drawText(textAside, this.x + this.R, this.y, this.color, 13);
    }
}