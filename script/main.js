// MAIN LOOP
function start() {
    // Resize Canvas
    resizeCanvas();
    // Clear Canvas each frame
    clearCanvas();
    // Draw Stars before transformation to fill the whole canvas
    stars.forEach(s => s.spin());
    // camera planet
    camera(cameraBody);
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
    runUniverse();

    // Reset Transformation Matrix
    c.restore();

    // SHOW NAMES AND INFOS ON MOUSE OVER
    // DRAW UNSCALED
    drawNames();

    runClock();
    // controls
    controls();
    // // camera planet
    // camera(cameraBody);
    // frameAnimation ID
    frAId = window.requestAnimationFrame(start);
}

// DRAW SUNS, PLANETS, MOONS, ORBITS AND COLLISION DETECTION
function runUniverse() {

    if (stopSpin) scaleT = 0;
    else scaleT = timeControl[i][1];
    if (orbit && scale > .03) {
        planets.forEach(p => p.drawOrbit());
    }
    if (scale < .01) {
        solarSystem.forEach(s => s.drawOrbit())
        // c.fillRect(center.x - 50 * AU, center.y, 100 * AU, 1 / scale);
    }

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

function drawNames() {
    // SOLAR SYSTEM BODIES
    if (scale > .01) {
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
            if (scale > 10) m.drawName();
            if (scale > 200 && m.isColliding) m.info();
        });
        voyager1.drawName();
        if (voyager1.isColliding) voyager1.info();
    } else {
        drawText('Solar System', center.x, center.y - 50 * AU, 'white', 13);
        if (scale > .00003) drawText('Oort Cloud', oortCloud[0].x, oortCloud[0].y, 'grey', 13);
        oortCloud[0].drawOrbit()
        // voyager1.drawName();
        if (voyager1.isColliding) voyager1.info();
    }

    // OTHER BODIES
    suns.forEach(s => {
        if (scale > 1e-9) {
            s.drawName();
            if (s.isColliding) s.info();
        }
    })
    m87.drawName();
    if (m87.isColliding) m87.info();
    universe.drawName();
    if (universe.isColliding) universe.info();
    alphaCentauri.forEach(a => {
        if (scale > 1e-9) {
            a.drawName();
            if (a.isColliding) a.info();
        }
    });

    // LIGHTSPEED TEST
    lightRay.drawName();
    if (lightRay.isColliding) lightRay.info();
}

// Center the canvas on a chosen body's position
// Gets called every frame in the main loop
// Uses global variable "cameraBody" as argument
// Does nothing if cameraBody is set to null
function camera(body) {
    if (body === null) return;

    let cwm = (canvas.width / 2)
    let chm = (canvas.height / 2)
    // let bx = body.x - (body.a * Math.cos(body.w + body.v) * body.d);
    // let by = body.y - ( body.b * Math.sin(body.w + body.v) * body.d);
    // STRAIGHT FLYING OBJECT
    center.x += cwm - body.x - body.v;
    center.y += chm - body.y - body.r;

    // center.x += cwm - bx;
    // center.y += chm - by;
    // ORBIT
    // center.x += cxm - bx ;
    // center.y += chm - by - body.r;
    // this.x = this.center.x + this.a * Math.cos(this.w) * this.d;
    // this.y = this.center.y + this.b * Math.sin(this.w) * this.d;

    // drawPlus(canvas.width / 2, canvas.height / 2, '#0f0')
    // drawX(body.center.x, body.center.y, '#f00')
}

// RUN COLLISION DETECTION
// SOLAR SYSTEM BODIES
function runCollisionDetection() {
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

function drawX(x, y, col) {
    c.beginPath();
    c.strokeStyle = col
    c.moveTo(x - 20, y - 20);
    c.lineTo(x + 20, y + 20)
    c.moveTo(x + 20, y - 20);
    c.lineTo(x - 20, y + 20);
    c.stroke();
}

function drawPlus(x, y, col) {
    c.beginPath();
    c.strokeStyle = col
    c.moveTo(x - 20, y);
    c.lineTo(x + 20, y)
    c.moveTo(x, y - 20);
    c.lineTo(x, y + 20);
    c.stroke();
}