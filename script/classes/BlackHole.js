class BlackHole extends CelestialBody {

    constructor(name, center, radius, distance, velocity, eccentricity, mass, color, type, colBH) {
        super(name, center, radius, distance, velocity, eccentricity, mass, color, type);
        this.w = 0;

        this.colBH = colBH;
        // this.colBH = ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"];

        // PARTICLE PROPERTIES
        this.particle = {
            count: 300,
            name: 'Asteroid of ' + this.name,
            minR: this.r * 1e-6,
            maxR: this.r * 1e-5,
            minD: this.r * .01,
            maxD: this.r * .3,
            minV: 0,
            maxV: C * .4,
            minE: .0,
            maxE: .0,
            m: 1e10,
            color: "#000000",
            colors: ["#FFFFFF", "#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"],
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
            this.particle.minV,
            this.particle.maxV,
            this.particle.minE,
            this.particle.maxE,
            this.particle.m,
            this.particle.color,
            this.particle.t);
    }


    draw() {

        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.closePath();
        c.fill();

        // DRAW EVENT HORIZON FOR BLACK HOLES
        this.eventHorizon();
        // this.vortex();
    }

    eventHorizon() {
        for (let i = 0; i < this.colBH.length; i++) {
            c.fillStyle = this.colBH[i];
            c.beginPath();
            // this.r * 1 - i * 1e-1;
            c.arc(this.x, this.y, this.r * (1 - (i * 1e-2)), 0, Math.PI * 2);
            c.closePath();
            c.fill();
        }
    }

    vortex() {
        let minSpeed = (this.particle.minV / this.particle.minD) * scaleV;
        let maxSpeed = (this.particle.maxV / this.particle.maxD) * scaleV;
        let rate = (maxSpeed - minSpeed) * .1;
        this.particles.forEach(p => {

            if (p.v <= maxSpeed) {
                p.v += rate;
                let interval = (maxSpeed - minSpeed) / this.particle.colors.length;
                let accumulated = p.v - minSpeed;
                let idx = this.particle.colors.length - Math.floor(accumulated / interval)
                p.color = this.particle.colors[idx];
            }
            p.d -= p.d / 3000;
            if (p.d < p.center.r) {
                let i = this.particles.indexOf(p);
                if (i > -1) this.particles.splice(i, 1);
                let newParticle = asteroidFactory(1, this.particle.name, this, this.particle.minR, this.particle.maxR, this.particle.minD, this.particle.maxD, this.particle.minV, this.particle.maxV, this.particle.minE, this.particle.maxE, this.particle.m, this.particle.color, this.particle.t);
                newParticle.forEach(nP => this.particles.push(nP));

            }
            p.tail(p.r, 10);
            p.run();
        });
    }


}