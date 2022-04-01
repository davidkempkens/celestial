// MAIN LOOP
function start() {
    // Resize Canvas
    resizeCanvas();
    // Clear Canvas each frame
    clearCanvas();
    // Draw Stars before transformation to fill the whole canvas
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
    drawScaled();

    // Reset Transformation Matrix
    c.restore();

    // SHOW NAMES AND INFOS ON MOUSE OVER
    // DRAW UNSCALED
    drawUnscaled();

    runClock();
    // controls
    controls();
    // camera planet
    camera(cameraBody);
    // frameAnimation ID
    frAId = window.requestAnimationFrame(start);
}

function drawUnscaled() {
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
        voyager1.n();
        if (voyager1.isColliding) voyager1.info();
    } else {
        drawText(['Solar System', `\u2205 ${formatNumber(50 * AU * 2e6)} km`], center.x, center.y - 50 * AU, 'white', 13);
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

    // LIGHTSPEED TEST
    lightRay.n();
    if (lightRay.isColliding) lightRay.info();
}

// DRAW SUNS, PLANETS, MOONS, ORBITS AND COLLISION DETECTION
function drawScaled() {

    if (stopSpin) scaleT = 0;
    else scaleT = timeControl[i][1];
    if (orbit && scale > .03) {
        planets.forEach(p => p.drawOrbit());
    }
    if (scale < .01) c.fillRect(center.x - 50 * AU, center.y, 100 * AU, 1 / scale);

    // RUN ALL BODIES
    // SOLAR SYSTEM BODIES
    sun.run();
    planets.forEach(p => p.run());
    dwarfs.forEach(d => d.run());
    moons.forEach(m => m.run());
    if (scale > .01) asteroids.forEach(a => a.run());
    oortCloud.forEach(o => o.run());
    voyager1.run();
    lightRay.run();
    // OTHER BODIES
    suns.forEach(s => s.run());
    alphaCentauri.forEach(a => a.run());
    m87.run();
    universe.run();

    // ON COLLISION DISPLAY COMPARE BODY AND ORBIT
    if (sun.isColliding)
        sun.compare(planets);
        planets.forEach(p => {
            if (p.isColliding) {
                p.drawOrbit();
                p.compare([earth, moon]);
            }
        });
    dwarfs.forEach(d => {
        if (d.isColliding) {
            d.drawOrbit();
            d.compare([earth, moon])
        }
    });
    moons.forEach(m => {
        if (m.isColliding) {
            m.drawOrbit();
            m.compare([moon]);
        }
        if (scale > 5 && orbit) m.drawOrbit();
    });
    asteroids.forEach(a => {
        if (a.isColliding && scale > .01) a.hover();
    });
    suns.forEach(s => {
        if (s.isColliding) s.compare([sun, ...suns]);
    });
    alphaCentauri.forEach(a => {
        if (a.isColliding) a.compare([sun]);
    });

    if (m87.isColliding) m87.compare([sun, ...suns]);
    if (universe.isColliding) universe.compare([m87]);
}

function camera(body) {
    // Does nothing if cameraBody is set to null
    if (body == null) return;
    // Center the canvas on a chosen body's position
    // Gets called every frame in the main loop
    // Uses global variable "cameraBody" as argument
    center.x += (canvas.width / 2) - body.x;
    center.y += (canvas.height / 2) - body.y - body.r;
}

function runCollisionDetection() {
    // RUN COLLISION DETECTION
    // SOLAR SYSTEM BODIES
    sun.collision(mouse);
    planets.forEach(p => p.collision(mouse));
    dwarfs.forEach(d => d.collision(mouse));
    moons.forEach(m => m.collision(mouse));
    if (scale > .01) asteroids.forEach(a => a.collision(mouse));
    oortCloud.forEach(o => o.collision(mouse));
    voyager1.collision(mouse);
    lightRay.collision(mouse);
    // OTHER BODIES
    suns.forEach(s => s.collision(mouse));
    alphaCentauri.forEach(a => a.collision(mouse));
    m87.collision(mouse);
    universe.collision(mouse);
}

function runClock() {
    frames++;
    if (frames === 60) {
        clock += scaleT;
        frames = 0;
    }

}