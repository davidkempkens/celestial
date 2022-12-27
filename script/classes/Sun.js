/** 
* Create a Sun
* @param {String} name Name
* @param {String} center The name of the center body.
* @param {Number} radius The Radius of this sun in solar radius (1 R = 6.957e8 m).
* @param {Number} distance Distance to the other body in light year (1 ly = 9 460 730 472 580 800 m).
* @param {Number} velocity Velocity relative to its center body in meters per second (m/s).
* @param {Number} mass Mass of the body in solar mass (1 M = 1.98847e30 kg).
* @param {String} color Color as String, e.g.: #0F2D23, 'white', 'rgb(0,255,0)'
* @param {String} type Type of the body, e.g. Planet, Dwarf, Asteroid, Sun
* @returns {Sun} sun Returns an CelestialBody Object.
*/
class Sun extends CelestialBody {

    constructor(name, center, radius, distance, velocity, mass, color, type) {
        super(name, center, radius * SOLAR_RADIUS, distance * LY, velocity, mass * SOLAR_MASS, color, type);
        // this.r = 26600 * LY;
        // this.v = 251000;
        // this.phi = 0;
    }

    draw() {
        super.draw();
        this.sunShine()
    }

    sunShine() {
        for (let i = 0; i < 10; i++) {
            c.fillStyle = this.color;
            c.globalAlpha = .01 - .001 * i;
            c.beginPath();
            c.arc(this.x, this.y, this.R + (this.R * i / 3), 0, Math.PI * 2);
            c.closePath();
            c.fill();
            c.globalAlpha = 1;
        }
    }
}