/** 
* Create a Black Hole
* @param {String} name Name
* @param {String} center The name of the center body.
* @param {Number} radius The Radius of this sun in solar radius (1 R = 6.957e8 m).
* @param {Number} distance Distance to the other body in light year (1 ly = 9 460 730 472 580 800 m).
* @param {Number} velocity Velocity relative to its center body in meters per second (m/s).
* @param {Number} mass Mass of the body in solar mass (1 M = 1.98847e30 kg).
* @param {String} color Color as String, e.g.: #0F2D23, 'white', 'rgb(0,255,0)'
* @param {String} type Type of the body, e.g. Planet, Dwarf, Asteroid, Sun, BlackHole
* @param {Array<String>} colors Array of color as string, e.g.: ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"]
* @returns {Blackhole} blackHole Returns an BlackHole Object.
*/
class BlackHole extends CelestialBody {

    constructor(name, center, radius, distance, velocity, mass, color, type, colors, symbol, phi) {
        super(name, center, radius, distance * LY, velocity, mass * SOLAR_MASS, color, type, symbol, phi);

        // Schwarzschild radius
        this.R = (2 * G * this.m) / (C ** 2);
        this.colBH = colors;

        // PARTICLE PROPERTIES
        this.particle = {
            count: 300,
            name: 'Asteroid of ' + this.name,
            minR: this.R * 1e-6,
            maxR: this.R * 1e-5,
            minD: this.R * (1 + .01),
            maxD: this.R * (1 + .3),
            m: 1e10,
            color: this.color,
            colors: this.colBH,
            t: 'Particle'
        };

        this.particles = asteroidFactory(
            this.particle.count,
            this.particle.name,
            this,
            this.particle.minR,
            this.particle.maxR,
            this.particle.minD,
            this.particle.maxD,
            this.particle.m,
            this.particle.color,
            this.particle.t);

        this.particles.forEach(p => {
            p.color = this.particle.colors[Math.floor(Math.random() * this.particle.colors.length)]
        });
    }


    draw() {
        super.draw();
        // DRAW EVENT HORIZON FOR BLACK HOLES
        this.eventHorizon();
        this.vortex();
    }

    eventHorizon() {
        for (let i = 0; i < this.colBH.length; i++) {
            c.beginPath();
            c.fillStyle = this.colBH[i];
            c.arc(this.x, this.y, this.R * (1 - (i * 1e-2)), 0, Math.PI * 2);
            c.fill();
            c.closePath();
        }
    }

    vortex() {
        this.particles.forEach(p => {
            p.tail(p.R, 10);
            p.run();
        });
    }
}