// MAIN LOOP
function start() {
    // Resize Canvas
    resizeCanvas();
    // Clear Canvas each frame
    clearCanvas();
    // Draw Stars before transformation to fill the whole canvas
    stars.forEach(s => s.spin());

    scaleDynamic();

    camera(cameraBody);

    // Actually run Physics and draw everything
    runUniverse();

    compareBodies();

    rescaleDynamic();
    // SHOW NAMES AND INFOS ON MOUSE OVER
    // DRAW UNSCALED
    drawNames();

    runClock();
    // controls
    controls();
    // frameAnimation ID
    // frAId = window.requestAnimationFrame(start);
}

async function setup() {
    await loadSolarSystemData();
    updateHUD([sun, ...planets, ...dwarfs, god, lightRay, voyager1], hudPlanets);
    updateHUD([...blackHoles, ...suns], hudSuns);
    updateHUD([...galaxies], hudOther);
    setInterval(start, 1000 / fps);
}

function runUniverse() {

    if (stopTime) dt = 0;
    else dt = timeControl[i][1];

    if (showTrajectories && scale > 1e-12) {
        solarSystem.forEach(s => s.drawTrajectory());
    }

    // RUN ALL BODIES
    // SOLAR SYSTEM BODIES
    sun.run();
    planets.forEach(p => {
        p.run();
        p.drawTrajectory();
    });
    dwarfs.forEach(d => d.run());
    moons.forEach(m => m.run());
    satellites.forEach(s => s.run());

    if (scale > 1e-12) asteroids.forEach(a => a.run());
    else if (scale > 5e-14) oortCloud.forEach(o => o.run());

    voyager1.run();
    lightRay.run();

    suns.forEach(s => s.run());
    blackHoles.forEach(bH => bH.run());

    try {
        galaxies.filter(g => g.R * scale < maxRenderDistance && g.R * scale > minRenderDistance).forEach(g => g.run());
    } catch (error) {
        console.log(error)
    }

    god.run();

}

function compareBodies() {
    if (sun.isColliding)
        sun.compare(planets);
    planets.forEach(p => {
        if (p.isColliding) {
            p.drawTrajectory();
            p.compare([earth, moon]);
        }
    });

    dwarfs.forEach(d => {
        if (d.isColliding) {
            d.drawTrajectory();
            d.compare([earth, moon]);
        }
    });

    moons.forEach(m => {
        if (m.isColliding) {
            m.drawTrajectory();
            m.compare([moon]);
        }
        if (scale > 1e-8)
            m.drawTrajectory();
    });

    if (scale > 1e-7) {
        satellites.forEach(s => s.drawTrajectory());
    }

    asteroids.forEach(a => {
        if (a.isColliding && scale > 1e-14) {
            a.hover();
        }
    });
    suns.forEach(s => {
        if (s.isColliding)
            s.compare([sun, ...suns, ...blackHoles]);
    });

    blackHoles.forEach(bH => {
        if (bH.isColliding)
            bH.compare([earth, sun, ...suns, ...blackHoles]);
    });
}

function drawNames() {

    bigBodies.forEach(bB => {
        if (bB.r * scale > 25) bB.drawName();
        if (bB.isColliding && scale * bB.r > 25) bB.details();
    });
    if (lightRay.r * scale > maxRenderDistance) lightRay.details();
    if (voyager1.r * scale > maxRenderDistance) voyager1.details();

    if (scale > 1e-12) {
        sun.drawName();
        if (sun.isColliding) sun.details()
        galaxies[0].details();
    } else {

        try {
            galaxies
                .filter(g => g.R * scale < maxRenderDistance && g.R * scale > minRenderDistance)
                .forEach(g => {
                    g.details();
                    console.log(g.name, (g.R * scale).toFixed(0))
                });
            // console.log(galaxies.filter(g => g.R * scale < maxRenderDistance))
            // let largerGalaxy = galaxies.filter(g => g.R * scale < maxRenderDistance).pop();
            // galaxies.filter(g => g.R * scale > maxRenderDistance).shift().details();
        } catch (error) {
            console.log(error)
        }
        // galaxies.filter(g => g.R * scale < maxRenderDistance).pop().details();
        // if (galaxies.filter(g => g.R * scale > maxRenderDistance).shift() !== undefined)
        //     galaxies.filter(g => g.R * scale > maxRenderDistance).shift().details();
        if (scale > 5e-14) drawText('Oort Cloud', oortCloud[0].x, oortCloud[0].y, 'grey', 13);
        if (god.R * scale < maxRenderDistance) god.details();
    }

}

// Center the canvas on a chosen body's position
// Gets called every frame in the main loop
// Uses global variable "cameraBody" as argument
// Does nothing if cameraBody is set to null
function camera(body) {
    if (body === null) return;

    let centerOfScreen = {
        x: canvas.width / 2,
        y: canvas.height / 2
    }

    let v = Math.sqrt(G * (body.M + body.m) * ((2 / body.r) - (1 / body.a)));
    let r = body.p / (1 + body.eps * Math.cos(body.phi + body.w * dt / fps));
    let w = v / r;

    let cameraPosition = {
        x: body.center.x + body.r * Math.cos(body.phi - w * dt / fps),
        y: body.center.y + body.r * Math.sin(body.phi - w * dt / fps)
    }

    if (body instanceof FlyingBody) {
        cameraPosition = {
            x: body.x + body.v * dt / fps,
            y: body.y
        };
    } else {
        cameraPosition = {
            x: body.x,
            y: body.y
        };
    }

    Center.x -= cameraPosition.x - centerOfScreen.x;
    Center.y -= body instanceof Galaxy ? cameraPosition.y - centerOfScreen.y + body.R : cameraPosition.y - centerOfScreen.y;

}

// RUN COLLISION DETECTION
function runCollisionDetection() {
    if (scale > 1e-12) asteroids.forEach(a => a.collision(mouse));
    // satellites.forEach(s => s.collision(mouse));
    // voyager1.collision(mouse);
    // iss.collision(mouse);
    // lightRay.collision(mouse);
    // suns.forEach(s => s.collision(mouse));
    // blackHoles.forEach(bH => bH.collision(mouse));
    // solarSystem.forEach(s => s.collision(mouse));
    bigBodies.forEach(b => b.collision(mouse));
}

function runClock() {
    frames++;
    if (frames === fps) {
        clock += dt;
        frames = 0;
    }

}

// Scale Canvas for Running Physics
function scaleDynamic() {
    // Save Transformation Matrix
    c.save();

    // Translate corresponding to the current scale
    trans = {
        x: (canvas.width / 2) * (1 - scale),
        y: (canvas.height / 2) * (1 - scale)
    }
    c.translate(trans.x, trans.y);
    // Scale Canvas
    c.scale(scale, scale);
}

// Scale Canvas for Drawing Text
function rescaleDynamic() {
    // Reset Transformation Matrix
    c.restore();
}

setup();