// MAIN LOOP
function start() {
    // Resize Canvas
    resizeCanvas();
    // Clear Canvas each frame
    clearCanvas();
    // Draw Stars before transformation to fill the whole canvas
    stars.forEach(s => s.spin());

    scaleDynamic();
    // camera planet
    camera(cameraBody);

    // Actually run Physics and draw everything
    runUniverse();

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
    updateHUD([sun, ...planets, ...dwarfs], hudPlanets);
    updateHUD([...suns], hudSuns);
    updateHUD([voyager1, ...blackHoles, ...satellites, ...galaxies, lightRay], hudOther);
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

    if (scale > 1e-12) asteroids.forEach(a => a.run());
    else if (scale > 5e-14) oortCloud.forEach(o => o.run());

    voyager1.run();
    lightRay.run();
    satellites.forEach(s => {
        s.run();
    });
    // OTHER BODIES
    suns.forEach(s => s.run());
    blackHoles.forEach(bH => bH.run());
    galaxies.forEach(g => g.run());


    // ON COLLISION DISPLAY COMPARE BODY AND ORBIT
    if (sun.isColliding) sun.compare(planets);
    planets.forEach(p => {
        if (p.isColliding) {
            p.drawTrajectory();
            p.compare([earth, moon]);
        }
    });

    dwarfs.forEach(d => {
        if (d.isColliding) {
            d.drawTrajectory()
            d.compare([earth, moon])
        }
    });

    moons.forEach(m => {
        if (m.isColliding) {
            m.drawTrajectory()
            m.compare([moon]);
        }
        if (scale > 1e-8) m.drawTrajectory()
    });

    if (scale > 1e-7) {
        satellites.forEach(s => s.drawTrajectory())
    }

    asteroids.forEach(a => {
        if (a.isColliding && scale > 1e-14) {
            a.hover();
        }
    });
    suns.forEach(s => {
        if (s.isColliding) s.compare([sun, ...suns, ...blackHoles]);
    });

    blackHoles.forEach(bH => {
        if (bH.isColliding) bH.compare([earth, sun, ...suns, ...blackHoles])
    })


}

function drawNames() {

    bigBodies.forEach(bB => {
        if (bB.r * scale > 25) bB.drawName();
        if (bB.isColliding && scale * bB.R > 25) bB.info();
    });

    if (scale > 1e-12) {
        sun.drawName();
    } else {
        if (scale * milkyWay.R > 25) drawText('Solar System', Center.x, Center.y - 50 * AE, 'white', 13);
        drawText('Milky Way', Center.x, Center.y - milkyWay.R, 'white', 13);
        if (scale > 5e-14) drawText('Oort Cloud', oortCloud[0].x, oortCloud[0].y, 'grey', 13);
    }

    galaxies.forEach(g => {
        if (g.R * scale > 30)
            // g.drawName();
            if (g.R * scale < 1000) g.info();
    });
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

    // let bodyPosition = {
    //     x: body instanceof FlyingBody ? body.x + body.v : body.center.x + body.a * Math.cos(body.w + (scaleV * (body.velocity / body.distance))) * body.d,
    //     y: body instanceof FlyingBody ? body.y : body.center.y + body.b * Math.sin(body.w + (scaleV * (body.velocity / body.distance))) * body.d
    // }
    // Physics for orbiting Bodies - Update angular velocity
    let v = Math.sqrt(G * (body.M + body.m) * ((2 / body.r) - (1 / body.a)));
    let r = body.p / (1 + body.eps * Math.cos(body.phi + body.w * dt / fps));
    let w = v / r;

    let bodyPosition = {
        x: body.center.x + body.r * Math.cos(body.phi - w * dt / fps),
        y: body.center.y + body.r * Math.sin(body.phi - w * dt / fps)
    }

    if (body instanceof FlyingBody) {
        bodyPosition = {
            x: body.x + body.v * dt / fps,
            y: body.y
        };
    } else {
        bodyPosition = {
            x: body.x,
            y: body.y
        };
    }


    Center.x -= bodyPosition.x - centerOfScreen.x;
    Center.y -= bodyPosition.y - centerOfScreen.y + body.R;

}

// RUN COLLISION DETECTION
function runCollisionDetection() {
    if (scale > 1e-12) asteroids.forEach(a => a.collision(mouse));
    satellites.forEach(s => s.collision(mouse));
    voyager1.collision(mouse);
    iss.collision(mouse);
    lightRay.collision(mouse);
    suns.forEach(s => s.collision(mouse));
    blackHoles.forEach(bH => bH.collision(mouse));
    solarSystem.forEach(s => s.collision(mouse));
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