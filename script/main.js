// MAIN LOOP
function start() {
    // Resize Canvas
    resizeCanvasToDisplaySize();
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

    // DRAW THINGS UNSCALED HERE
    if (scale > .001) {
        bigBodies.forEach(b => {
            if (b.type != 'Moon') b.n();
            if (b.isColliding && b.type != 'Moon') {
                b.info();
            }
        });
    } else {
        drawText(['Solar System', `\u2205 ${formatNumber(50 * AU * 2e6)} km`], center, 13, true);
        if (scale > 1e-12) m87.info();
        universe.info();
        alphaCentauri.forEach(a => a.n());
    }

    if (scale > 5) {
        moons.forEach(m => m.n());
        if (scale > 200) moons.forEach(m => {
            if (m.isColliding) m.info();
        });
    }


    // ui
    ui();
    // camera planet
    camera(cameraPlanet);
    // frameAnimation ID
    frAId = window.requestAnimationFrame(start);
}
// Resize Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function resizeCanvasToDisplaySize() {
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
    }
}

// Clear Canvas every frame - background color as global variable
function clearCanvas() {
    c.fillStyle = bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// DRAW SUNS, PLANETS, MOONS, ORBITS AND COLLISION DETECTION
function drawEverything() {

    if (!stop) everything.forEach(e => e.v = e.velocity * scaleV);
    else everything.forEach(e => e.v = 0);

    if (orbit) {
        planets.forEach(p => p.orbit());
        // dwarfs.forEach(d => d.orbit());
        // moons.forEach(m => m.orbit());
    }
    // RUN ALL BODIES
    everything.forEach(e => e.run());

    // Dynamically show infos
    if (scale < .01) {
        bigBodies.forEach(bB => {
            bB.collision(mouse);
            if (bB.isColliding) {
                bB.orbit();
                bB.compare(sun);
            }
        });
    } else {
        everything.forEach(e => {
            e.collision(mouse);
            if (e.isColliding) {
                e.orbit();
                if (e.r > m87) e.compare(m87);
                if (e.r > sun.r) e.compare(sun);
                else if (e.r > earth.r) e.compare(earth);
                else if (e.r > moon.r) e.compare(moon);
                else e.draw();
            }
        });
    }

    universe.compare(m87);
}

// Center the canvas on a chosen body's position
// Gets called every fram in the main loop
// Uses global variable "cameraPlanet" as argument
function camera(body) {
    // Does nothing if cameraPlanet is set to null
    if (body == null) return;

    // Zomm down to Planet
    // if (scale < p.r * 100) scale /= scaleFactor + .07;

    center.x += (canvas.width / 2) - body.x;
    center.y += (canvas.height / 2) - body.y - body.r;
}