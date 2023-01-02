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

    constructor(name, center, radius, distance, velocity, mass, color, type, count = 120) {
        super(name, center, radius, distance, velocity, mass, color, type);

        this.star = {
            count: count,
            name: 'Star of ' + this.name,
            minR: this.R * 1e-3,
            maxR: this.R * 5e-3,
            minD: this.R * .05,
            maxD: this.R * .99,
            m: SOLAR_MASS,
            color: this.color,
            colors: ['#FFF', '#F2D6BD', '#8FCBD9', '#F2AE2E', '#F27D16'],
            t: 'Star'
        };

        this.stars = galaxiesFactory(
            this.star.count,
            this.star.name,
            this,
            this.star.minR,
            this.star.maxR,
            this.star.minD,
            this.star.maxD,
            this.star.m,
            this.star.colors,
            this.star.t);
    }

    run() {
        if (this.center !== Center) {
            this.center.run();
        }
        this.x = this.center.x + this.r * Math.cos(this.phi);
        this.y = this.center.y + this.r * Math.sin(this.phi);

        this.draw();
    }


    draw() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = 0.5 / scale;
        c.arc(this.x, this.y, this.R, 0, Math.PI * 2);
        c.stroke();
        c.closePath();

        if (this.m != 0)
            this.spiral();

        // c.fillStyle = this.color;
        // c.fillRect(
        //     this.x - this.R,
        //     this.y - this.R - 10 / scale,
        //     this.R * 2,
        //     2 / scale
        // );
    }

    spiral() {
        this.stars.forEach(s => {
            s.run();
            s.shine();
        });
    }

    drawName() {
        drawText(this.name, this.x + this.R / Math.SQRT2, this.y + this.R / Math.SQRT2, this.color, 13);
    }

}