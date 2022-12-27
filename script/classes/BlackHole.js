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

    constructor(name, center, radius, distance, velocity, mass, color, type, colors) {
        super(name, center, radius, distance * LY, velocity, mass * SOLAR_MASS, color, type);
        // this.w = 0;

        this.colBH = colors;
        // this.colBH = ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"];

        // PARTICLE PROPERTIES
        this.particle = {
            count: 300,
            name: 'Asteroid of ' + this.name,
            minR: this.R * 1e-6,
            maxR: this.R * 1e-5,
            minD: this.R * (1 + .01),
            maxD: this.R * (1 + .3),
            minV: 0,
            maxV: C * .4,
            minE: .0,
            maxE: .0,
            m: 1e10,
            color: "#000000",
            colors: ["#FFFFFF", ...this.colBH],
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
    }


    draw() {

        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.R, 0, Math.PI * 2);
        c.closePath();
        c.fill();

        // DRAW EVENT HORIZON FOR BLACK HOLES
        this.eventHorizon();
        this.vortex();
    }

    eventHorizon() {
        for (let i = 0; i < this.colBH.length; i++) {
            c.fillStyle = this.colBH[i];
            c.beginPath();
            // this.R * 1 - i * 1e-1;
            c.arc(this.x, this.y, this.R * (1 - (i * 1e-2)), 0, Math.PI * 2);
            c.closePath();
            c.fill();
        }
    }

    vortex() {
        let minSpeed = (this.particle.minV / this.particle.minD) * dt;
        let maxSpeed = (this.particle.maxV / this.particle.maxD) * dt;
        let rate = (maxSpeed - minSpeed) * .1;
        this.particles.forEach(p => {

            if (p.v <= maxSpeed) {
                if (!stopTime) p.v += rate;
                let interval = (maxSpeed - minSpeed) / this.particle.colors.length;
                let accumulated = p.v - minSpeed;
                let idx = this.particle.colors.length - Math.floor(accumulated / interval);
                if (!isNaN(idx)) p.color = this.particle.colors[idx];
            }
            // if (!stopTime) p.r -= p.r / 3000;
            // if (p.d < p.center.r) {
            //     let i = this.particles.indexOf(p);
            //     if (i > -1) this.particles.splice(i, 1);
            //     let newParticle = asteroidFactory(1, this.particle.name, this, this.particle.minR, this.particle.maxR, this.particle.minD, this.particle.maxD, this.particle.minV, this.particle.maxV, this.particle.minE, this.particle.maxE, this.particle.m, this.particle.color, this.particle.t);
            //     newParticle.forEach(nP => this.particles.push(nP));

            // }
            // p.rp += 1e3 * dt;
            p.tail(p.R, 10);
            // p.drawTrajectory()
            p.run();
            // p.color = 'white'
            rescaleDynamic();
            // p.drawName();
            // if (p.name == '0. Asteroid of M87*') p.info();
            scaleDynamic();
        });
    }


}