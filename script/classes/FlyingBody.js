/** 
* Create a body flying in a straight line away from its center body.
* @param {String} name Name
* @param {String} center The name of the center body.
* @param {Number} radius The Radius of the body in meters (m).
* @param {Number} distance Distance to the other body in meters (m).
* @param {Number} velocity Velocity relative to its center body in meters per second (m/s).
* @param {Number} mass Mass of the body in Kilogramm (kg).
* @param {String} color Color as String, e.g.: #0F2D23, 'white', 'rgb(0,255,0)'
* @param {String} type Type: Probe, Photon
*/
class FlyingBody extends CelestialBody {
    constructor(name, center, radius, distance, veloctiy, mass, color, type) {
        super(name, center, radius, distance, veloctiy, mass, color, type);
    }

    run() {

        // Physics for Bodies flying in a straight line
        this.r += this.v * dt / fps;
        this.x = this.center.x + this.r;
        this.y = this.center.y;
        this.draw()
    }

    flightPath() {
        // DRAW LINE TO SHOW DIRECTION
        if (!this.isColliding) return;
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = .5 / scale;
        c.moveTo(this.center.x + this.center.R, this.center.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

    details() {
        let textAside = [
            `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
            `${formatNumber(this.v * 1e-3)} km/s `, // Display Velocity
        ];
        // CALL TEXT FUNCTION
        drawText(textAside, this.x + this.R, this.y, this.color, 13);
    }
}