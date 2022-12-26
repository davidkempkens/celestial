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
    setInterval(start, 1000 / fps);
}

// DRAW SUNS, PLANETS, MOONS, ORBITS AND COLLISION DETECTION
function runUniverse() {

    if (stopTime) dt = 0;
    else dt = timeControl[i][1];

    let earth = solarSystem.find(x => x.name == 'Earth');
    let moon = solarSystem.find(x => x.name == 'Moon');


    if (showTrajectories && scale > 1e-12) {
        solarSystem.forEach(s => s.drawOrbit())
    }
    planets.forEach(p => p.drawOrbit());
    if (scale < 1e-12) {
        // c.fillRect(Center.x - 50 * AE, Center.y, 100 * AE, 1 / scale);
        planets.forEach(p => {
            p.drawOrbit();
        });
        oortCloud.forEach(o => {
            o.run();
        });
    }

    // RUN ALL BODIES
    // SOLAR SYSTEM BODIES
    sun.run();
    planets.forEach(p => p.run());
    dwarfs.forEach(d => d.run());
    moons.forEach(m => m.run());
    // solarSystem.forEach(s => {
    //     s.run();
    // })

    if (scale > 1e-12)
        asteroids.forEach(a => a.run());
    // oortCloud.forEach(o => o.run());
    voyager1.run();
    // lightRay.run();
    // OTHER BODIES
    // suns.forEach(s => s.run());
    // alphaCentauri.forEach(a => a.run());
    // m87.run();
    // sagittariusA.run()
    // blackHoles.forEach(bH => bH.run());
    // milkyWay.run();
    // universe.run();

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
        if (scale > 1e-7 && showTrajectories) m.drawOrbit();
    });
    asteroids.forEach(a => {
        if (a.isColliding && scale > 1e-14) {
            // a.drawOrbit();
            a.hover();
        }
    });
    // suns.forEach(s => {
    //     if (s.isColliding) s.compare([sun, ...suns]);
    // });
    // alphaCentauri.forEach(a => {
    //     if (a.isColliding) a.compare([sun]);
    // });

    // blackHoles.forEach(bH => {
    //     if (bH.isColliding) bH.compare([earth, sun, ...blackHoles])
    // })
    // if (m87.isColliding) m87.compare([sun, ...suns, ...blackHoles]);
    // if (universe.isColliding) universe.compare([m87]);
}

function drawNames() {
    // SOLAR SYSTEM BODIES
    if (scale > 1e-12) {
        sun.drawName();
        if (sun.isColliding) sun.info();
        planets.forEach(p => {
            p.drawName();
            if (p.isColliding) p.info();
        });
        dwarfs.forEach(d => {
            d.drawName();
            if (d.isColliding) d.info();
        })
        moons.forEach(m => {
            if (scale > 1e-7) m.drawName();
            if (scale > 1e-7 && m.isColliding) m.info();
        });
        voyager1.drawName();
        if (voyager1.isColliding) voyager1.info();
    } else {
        if (scale > 1e-15) drawText('Solar System', Center.x, Center.y - 50 * AE, 'white', 13);
        if (scale > 1e-15) drawText('Oort Cloud', oortCloud[0].x, oortCloud[0].y, 'grey', 13);
        // voyager1.drawName();
        // if (voyager1.isColliding) voyager1.info();
    }

    // OTHER BODIES
    // suns.forEach(s => {
    //     if (scale > 1e-9) {
    //         s.drawName();
    //         if (s.isColliding) s.info();
    //     }
    // })

    // blackHoles.forEach(bh => {
    //     if (scale > 1e-14) {
    //         bh.drawName();
    //         if (bh.isColliding) bh.info();
    //     }
    // })

    // alphaCentauri.forEach(a => {
    //     if (scale > 1e-9) {
    //         a.drawName();
    //      if (a.isColliding) a.info();
    //     }
    // });

    // LIGHTSPEED TEST
    // lightRay.drawName();
    // if (lightRay.isColliding) {
    //     lightRay.info();
    // console.log(lightRay.d, scale)
    // }

    // milkyWay.draw();
    // milkyWay.info();
    // universe.drawName();
    // universe.info();
    // if (universe.isColliding) universe.info();
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

    let bodyPosition = {
        x: body.center.x + body.r * Math.cos(body.phi - body.w * dt),
        y: body.center.y + body.r * Math.sin(body.phi - body.w * dt)
    }

    if (body.name == 'Sun') {
        bodyPosition = {
            x: body.x,
            y: body.y
        };
    } else if (body instanceof FlyingBody) {
        console.log(body)
        bodyPosition = {
            x: body.x,
            y: body.y
        };
    }


    Center.x -= bodyPosition.x - centerOfScreen.x;
    Center.y -= bodyPosition.y - centerOfScreen.y + body.R;

}

// RUN COLLISION DETECTION
// SOLAR SYSTEM BODIES
function runCollisionDetection() {
    // sun.collision(mouse);
    // planets.forEach(p => p.collision(mouse));
    // dwarfs.forEach(d => d.collision(mouse));
    // moons.forEach(m => m.collision(mouse));
    solarSystem.forEach(s => s.collision(mouse));
    if (scale > 1e-12)
        asteroids.forEach(a => a.collision(mouse));
    // oortCloud.forEach(o => o.collision(mouse));
    voyager1.collision(mouse);
    // lightRay.collision(mouse);
    // // OTHER BODIES
    // suns.forEach(s => s.collision(mouse));
    // alphaCentauri.forEach(a => a.collision(mouse));
    // blackHoles.forEach(bH => bH.collision(mouse));
    // m87.collision(mouse);
    // sagittariusA.collision(mouse)
    // universe.collision(mouse);
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