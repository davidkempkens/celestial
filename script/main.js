// MAIN LOOP
function start() {
    // Resize Canvas
    resizeCanvas();
    // Clear Canvas each frame
    clearCanvas();
    // Draw Stars before transfomation to fill the whole canvas
    stars.forEach(s => s.spin());

    // Save Transformation Matrix
    c.save();
    // Translate corresponding to the current scale - MAGIC NUMBER FOR NOW
    trans = {
        x: (canvas.width / 2) * (1 - scale),
        y: (canvas.height / 2) * (1 - scale)
    }
    c.translate(trans.x, trans.y);
    // Scale Canvas
    c.scale(scale, scale);
    // Actually run Physics and draw everything
    drawEverything();
    // Reset Transformation Matrix
    c.restore();

    // SHOW NAMES AND INFOS ON MOUSE OVER
    // DRAW UNSCALED
    // SOLAR SYSTEM BODIES
    if (scale > .01) {
        sun.n();
        if (sun.isColliding) sun.info();
        planets.forEach(p => {
            p.n();
            if (p.isColliding) p.info();
        });
        dwarfs.forEach(d => {
            d.n();
            if (d.isColliding) d.info();
        })
        moons.forEach(m => {
            if (scale > 10) m.n();
            if (scale > 200 && m.isColliding) m.info();
        });
    } else {
        let t = {
            x: center.x,
            y: center.y - 50 * AU,
            r: 0
        }
        drawText(['Solar System', `\u2205 ${formatNumber(50 * AU * 2e6)} km`], t, 13, true);
    }
    // OTHER BODIES
    suns.forEach(s => {
        if (scale > 1e-9) s.n();
        if (s.isColliding) s.info();
    })
    m87.n();
    if (m87.isColliding) m87.info();
    universe.n();
    if (universe.isColliding) universe.info();
    alphaCentauri.forEach(a => {
        if (scale > 1e-9) a.n();
        if (a.isColliding) a.info();
    });

    // ui
    ui();
    // camera planet
    camera(cameraBody);
    // frameAnimation ID
    frAId = window.requestAnimationFrame(start);
}
// Resize Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Clear Canvas every frame - background color as global variable
function clearCanvas() {
    c.fillStyle = bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// DRAW SUNS, PLANETS, MOONS, ORBITS AND COLLISION DETECTION
function drawEverything() {

    if (!stopSpin) everything.forEach(e => e.v = e.velocity * scaleV);
    else everything.forEach(e => e.v = 0);

    if (orbit && scale > .03) {
        planets.forEach(p => p.orbit());
        // dwarfs.forEach(d => d.orbit());
        // moons.forEach(m => m.orbit());
    }
    if (scale < .01) c.fillRect(center.x - 50 * AU, center.y, 100 * AU, 1 / scale);
    // RUN ALL BODIES
    // SOLAR SYSTEM BODIES
    sun.run();
    planets.forEach(p => p.run());
    dwarfs.forEach(d => d.run());
    moons.forEach(m => m.run());
    if (scale > .01) asteroids.forEach(a => a.run());
    // OTHER BODIES
    suns.forEach(s => s.run());
    alphaCentauri.forEach(a => a.run());
    m87.run();
    universe.run();
    runParticles();
    // RUN COLLISION DETECTION
    // SOLAR SYSTEM BODIES
    sun.collision(mouse);
    planets.forEach(p => p.collision(mouse));
    dwarfs.forEach(d => d.collision(mouse));
    moons.forEach(m => m.collision(mouse));
    if (scale > .01) asteroids.forEach(a => a.collision(mouse));
    // OTHER BODIES
    suns.forEach(s => s.collision(mouse));
    alphaCentauri.forEach(a => a.collision(mouse));
    m87.collision(mouse);
    universe.collision(mouse);

    // ON COLLISON DISPLAY COMAPRE BODY AND ORBIT
    if (sun.isColliding) sun.compare(earth);
    planets.forEach(p => {
        if (p.isColliding) {
            p.orbit();
            p.compare(earth);
        }
    });
    dwarfs.forEach(d => {
        if (d.isColliding) {
            d.orbit();
            d.compare(earth)
        }
    });
    moons.forEach(m => {
        if (m.isColliding) {
            m.orbit();
            m.compare(moon);
        }
        if (scale > 5 && orbit) m.orbit();
    });
    asteroids.forEach(a => {
        if (a.isColliding && scale > .01) a.hover();
    });
    suns.forEach(s => {
        if (s.isColliding) s.compare(sun);
    });
    alphaCentauri.forEach(a => {
        if (a.isColliding) a.compare(sun);
    });

    if (m87.isColliding) m87.compare(sun);
    if (universe.isColliding) universe.compare(m87);
}

// Center the canvas on a chosen body's position
// Gets called every fram in the main loop
// Uses global variable "cameraBody" as argument
function camera(body) {
    // Does nothing if cameraBody is set to null
    if (body == null) return;
    // Zoom down to Planet
    // if (scale < p.r * 100) scale /= scaleFactor + .07;

    center.x += (canvas.width / 2) - body.x;
    center.y += (canvas.height / 2) - body.y - body.r;
}

// PARTICLES
let cen = sun
let minR = cen.r * .00001;
let maxR = cen.r * .00003;
let minD = cen.r * 5;
let maxD = cen.r * 25;
let minV = 5000;
let maxV = 10000;

var particles = asteroidFactory(500, '. Particle', cen, minR, maxR, minD, maxD, minV, maxV, .1, 1e20, 'white', 'Particle');

function runParticles() {
    cen = cameraBody || m87;
    minR = cen.r * .00001;
    maxR = cen.r * .00003;
    minD = cen.r * 5;
    maxD = cen.r * 25;
    minV = 5000;
    maxV = 10000;

    particles.forEach(p => {
        p.run();
        p.v += .00001;
        p.d -= p.w * p.center.r * .01;
        if (p.d < p.center.r * 1.3) {
            let i = particles.indexOf(p);
            if (i > -1) particles.splice(i, 1);
            let newParticle = asteroidFactory(1, p.name, cen, minR, maxR, minD, maxD, minV, maxV, .1, 1e20, 'white', 'Particle');
            particles.push(newParticle[0]);
        }
        p.sunShine();
        p.orbit();
    });

}