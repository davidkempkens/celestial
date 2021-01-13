// Global control variable
var cameraPlanet = null;
var stop = false;
var orbit = true;
// SCALING AND TRANSLATION GLOBALS
var scale = 1;
var scaleFactor = .9;
var trans = {
    x: 0,
    y: 0
}

var bg = '#050a10';
// Frame Animation ID - used to cancel / start Animationframes
var frAId;

// EVENT LISTENER

window.addEventListener('touchmove', e => {
    e.preventDefault();
});

// HANDLE MOUSE DRAG
var mouse = {
    x: 0,
    y: 0,
    r: 30 / scale
};

var startDragOffset = {};
var mouseDown = false;

canvas.addEventListener("mousedown", down);

function down(e) {
    e.preventDefault();
    mouseDown = true;

    // cancel Camera cameraing the current planet
    cameraPlanet = null;

    startDragOffset.x = (e.clientX / scale) - center.x;
    startDragOffset.y = (e.clientY / scale) - center.y;

    // Click on body to camera
    bigBodies.forEach(bB => {
        if (bB.isColliding) cameraPlanet = bB;
    });
}

canvas.addEventListener("mousemove", move);

function move(e) {
    e.preventDefault();
    if (mouseDown) {
        center.x = (e.clientX / scale) - startDragOffset.x;
        center.y = (e.clientY / scale) - startDragOffset.y;
    }

    // Collision detection on mouse over bodies
    var bCR = canvas.getBoundingClientRect();

    // Update Mouse Coords on Mouse Move in Mouse object
    mouse = {
        // Actual Mouse Coord - offSet (start Canvas) - Translation / current scale
        x: (e.clientX - bCR.x - trans.x) / scale,
        y: (e.clientY - bCR.y - trans.y) / scale,
        // Distance needed to collide with Planets etc.
        r: 30 / scale
    }
}

// To Cancel Dragging
canvas.addEventListener("mouseup", () => mouseDown = false);
canvas.addEventListener('mouseover', () => mouseDown = false);
canvas.addEventListener('mouseout', () => mouseDown = false);


// HANDLE TOUCH INPUT

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", e => {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchend", e => {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);
document.body.addEventListener("touchmove", e => {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, false);

canvas.addEventListener('touchstart', (e) => {
    var touch = {
        x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
        y: e.touches[0].clientY - canvas.getBoundingClientRect().top
    }
    var mE = new MouseEvent("mousedown", {
        clientX: touch.x,
        clientY: touch.y
    });
    canvas.dispatchEvent(mE);
});

canvas.addEventListener('touchmove', e => {
    var touch = e.touches[0];
    var mE = new MouseEvent("mousemove", {
        clientX: touch.x,
        clientY: touch.y
    });
    canvas.dispatchEvent(mE);
});

canvas.addEventListener('touchend', () => {
    var mE = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mE);
});

// HANDLE MOUSE ZOOMING
window.addEventListener('wheel', e => {
    let z = e.deltaY / 100;
    scale *= scaleFactor ** z;
});


// KEYBOARD INPUT
window.addEventListener('keypress', e => {
    switch (e.key) {
        case 's':
            stop = !stop;
            break;
        case 'o':
            orbit = !orbit;
            break;
        case 'f':
            cameraPlanet = planets[Math.floor(Math.random() * planets.length)];
            break;
        case 'a':
            scale = 1e-10;
            break;
        case 'c':
            cameraPlanet = null;
            center.x = canvas.width / 2;
            center.y = canvas.height / 2;
            break;
        case '-':
            scale *= scaleFactor;
            break;
        case '+':
            scale /= scaleFactor;
            break;
        case 'r':
            scale = 1;
            break;
        default:
            break;
    }
});

// MAIN LOOP
function start() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        moons.forEach((m) => m.n());
        if (scale > 200) moons.forEach((m) => m.info());
    }

    // Bar
    bar();
    // camera planet
    camera(cameraPlanet);
    // frameAnimation ID
    frAId = window.requestAnimationFrame(start);
}

// Background Color
function clearCanvas() {
    c.fillStyle = bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// Stars
var amount = 500;
var stars = [];

for (let i = 0; i < amount; i++) {
    stars.push(new Star(canvas.width, canvas.height));
}
// RUN MAIN LOOP
start();

// DRAW SUNS, PLANETS, MOONS, TEXT, ORBIT, etc
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
    // if (scale < 1e-11 && !mouseDown) camera(universe);
}

// Follow Body
function camera(body) {

    // Parameter is current celestial body
    if (body == null) return;

    // Zomm down to Planet
    // if (scale < p.r * 100) scale /= scaleFactor + .07;

    // center.x = center.x - body.x + (canvas.width / 2);
    // center.y = center.y - body.y - body.r + (canvas.height / 2);
    center.x += (canvas.width / 2) - body.x;
    center.y += (canvas.height / 2) - body.y - body.r;
}