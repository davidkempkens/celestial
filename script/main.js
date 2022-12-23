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
setInterval(start, 1000 / 60);
// DRAW SUNS, PLANETS, MOONS, ORBITS AND COLLISION DETECTION
function runUniverse() {

    if (stopSpin) dt = 0;
    else dt = timeControl[i][1] * 1 / 60;
    if (orbit && scale > 1e-12) {
    }
    planets.forEach(p => p.drawOrbit());
    if (scale < 1e12) {
        // solarSystem.forEach(s => s.drawOrbit())
        // c.fillRect(center.x - 50 * AU, center.y, 100 * AU, 1 / scale);
    }

    // RUN ALL BODIES
    // SOLAR SYSTEM BODIES
    // sun.run();
    // planets.forEach(p => p.run());
    // dwarfs.forEach(d => d.run());
    // moons.forEach(m => m.run());
    solarSystem.forEach(s => {
        s.run();
    })

    if (scale > 1e-12)
        asteroids.forEach(a => a.run());
    // oortCloud.forEach(o => o.run());
    // voyager1.run();
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
    // if (sun.isColliding)
    //     sun.compare(planets);
    planets.forEach(p => {
        if (p.isColliding) {
            p.drawOrbit();
            let e = solarSystem.find(x => x.name == 'Earth');
            let m = solarSystem.find(x => x.name == 'Moon');
            // console.log(solarSystem.find(x => x.name == 'Earth'))
            p.compare([e, m]);
        }

    });
    dwarfs.forEach(d => {
        if (d.isColliding) {
            d.drawOrbit();
            // d.compare([earth, moon])
        }
    });
    moons.forEach(m => {
        if (m.isColliding) {
            m.drawOrbit();
            // m.compare([moon]);
        }
        if (scale > 1e-7 && orbit) m.drawOrbit();
    });
    asteroids.forEach(a => {
        if (a.isColliding && scale > 1e-12) {
            a.hover();
            a.info();
            a.drawOrbit();
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
    if (scale > 1e-12 || true) {
        // solarSystem.forEach(s => {
        //     if (s.type == 'Star' || s.type == 'Dwarf') s.drawName();
        // });
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
        // voyager1.drawName();
        // if (voyager1.isColliding) voyager1.info();
    } else {
        if (scale > 1e-16) drawText('Solar System', Center.x, Center.y - 50 * AE, 'white', 13);
        // if (scale > .00003) drawText('Oort Cloud', oortCloud[0].x, oortCloud[0].y, 'grey', 13);
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
        x: body.x,
        y: body.y
    }

    Center.x -= bodyPosition.x - centerOfScreen.x;
    Center.y -= bodyPosition.y - centerOfScreen.y + body.R;

}

// RUN COLLISION DETECTION
// SOLAR SYSTEM BODIES
function runCollisionDetection() {
    // solarSystem[0].collision(mouse);
    // planets.forEach(p => p.collision(mouse));
    // dwarfs.forEach(d => d.collision(mouse));
    // moons.forEach(m => m.collision(mouse));
    solarSystem.forEach(s => s.collision(mouse));
    // if (scale > .01) asteroids.forEach(a => a.collision(mouse));
    // oortCloud.forEach(o => o.collision(mouse));
    // voyager1.collision(mouse);
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
    if (frames === 60) {
        clock += dt * 60;
        frames = 0;
    }

}

// Scale Canvas for Running Physics
function scaleDynamic() {
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
}

// Scale Canvas for Drawing Text
function rescaleDynamic() {
    // Reset Transformation Matrix
    c.restore();
}