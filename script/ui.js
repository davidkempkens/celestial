// USER INPUT
// ONLOAD

window.addEventListener("onload", resizeCanvas);
// HANDLE MOUSE EVENTS
// SCALE CANVAS WITH SCROLL
window.addEventListener("wheel", (e) => {
    let z = e.deltaY / 100;
    scale *= scaleFactor ** z;
});

// DRAG CANVAS
canvas.addEventListener("mousedown", down);
canvas.addEventListener("mousemove", move);
canvas.addEventListener("mouseup", () => mouseDown = false);
canvas.addEventListener("mouseover", () => mouseDown = false);
canvas.addEventListener("mouseout", () => mouseDown = false);

function down(e) {
    e.preventDefault();
    mouseDown = true;

    // cancel Camera cameraing the current planet
    cameraPlanet = null;

    startDragOffset.x = e.clientX / scale - center.x;
    startDragOffset.y = e.clientY / scale - center.y;

    // Click on body to camera
    bigBodies.forEach((bB) => {
        if (bB.isColliding) cameraPlanet = bB;
    });

    // show current planets that gets follow by the camera in the hud
    if (cameraPlanet != null) {
        cameraElement.innerHTML = 'Focus: ' + cameraPlanet.name;
        cameraElement.style.color = cameraPlanet.color;
    } else {
        cameraElement.innerHTML = 'Solar System';
        cameraElement.style.color = 'white';
    }
}

function move(e) {
    e.preventDefault();
    if (mouseDown) {
        center.x = e.clientX / scale - startDragOffset.x;
        center.y = e.clientY / scale - startDragOffset.y;
    }

    // Collision detection on mouse over bodies
    var bCR = canvas.getBoundingClientRect();

    // Update Mouse Coords on Mouse Move in Mouse object
    mouse = {
        // Actual Mouse Coord - offSet (start Canvas) - Translation / current scale
        x: (e.clientX - bCR.x - trans.x) / scale,
        y: (e.clientY - bCR.y - trans.y) / scale,
        // Distance needed to collide with Bodies etc.
        r: 30 / scale,
    };
}

// HANDLE TOUCH EVENTS - EXPERIMENTAL
// Send touch positions to mouse event
document.body.addEventListener("touchstart", e => {
    e.preventDefault();
    var touch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    var mE = new MouseEvent("mousedown", {
        clientX: touch.x,
        clientY: touch.y,
    });
    canvas.dispatchEvent(mE);
});

document.body.addEventListener("touchmove", e => {
    e.preventDefault();
    var touch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
    };
    var mE = new MouseEvent("mousemove", {
        clientX: touch.x,
        clientY: touch.y,
    });
    canvas.dispatchEvent(mE);
});

document.body.addEventListener("touchend", () => {
    var mE = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mE);
});

// HANDLE KEYBOARD EVENTS
window.addEventListener("keypress", (e) => {
    switch (e.key) {
        case "s":
            stop = !stop;
            break;
        case "o":
            orbit = !orbit;
            break;
        case "f":
            cameraPlanet = planets[Math.floor(Math.random() * planets.length)];
            break;
        case "a":
            scale = 1e-10;
            break;
        case "c":
            cameraPlanet = null;
            center.x = canvas.width / 2;
            center.y = canvas.height / 2;
            break;
        case "-":
            scale *= scaleFactor;
            break;
        case "+":
            scale /= scaleFactor;
            break;
        case "r":
            scale = 1;
            break;
        default:
            break;
    }
});

// BUTTONS
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const resetBtn = document.getElementById("resetBtn");
const centerBtn = document.getElementById("centerBtn");
const orbitBtn = document.getElementById("orbitBtn");

plusBtn.addEventListener("click", () => (scale /= scaleFactor));
minusBtn.addEventListener("click", () => (scale *= scaleFactor));
resetBtn.addEventListener("click", () => (scale = 1));
centerBtn.addEventListener("click", () => {
    cameraPlanet = null;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
});
orbitBtn.addEventListener("click", () => (orbit = !orbit));

// SIDENAV MENU
const sideNav = document.getElementById("sidenav");

// HUD
const hud = document.getElementById('hud');
const cameraElement = document.getElementById('camera');
const scaleElement = document.getElementById('scaleElement');
const stopElement = document.getElementById('stopElement');

cameraElement.addEventListener('click', () => {
    cameraPlanet = null;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
})

scaleElement.addEventListener('click', () => scale = 1);


stopElement.addEventListener('click', () => stop = !stop);
// Draw bar at the bottom of the canvas to show scale
function ui() {

    // Bar Position
    let bar = {
        x: (canvas.width / 2),
        w: (canvas.width / 9),
        y: canvas.height - (canvas.height / 30),
        r: 0
    }

    // Draw Lines
    c.beginPath();
    c.fillStyle = 'white';
    c.fillRect(bar.x, bar.y, bar.w, 1);
    c.fillRect(bar.x, bar.y - 6, 1, 12);
    c.fillRect(bar.x + bar.w, bar.y - 6, 1, 12);
    c.closePath();

    // Text above bar
    let km = formatNumber((earth.d * 1000000) / scale);
    let AU = formatNumber(1 / scale);
    let ly = formatNumber((1 / 63241.077) / scale);

    let text = [`${ly} light-years`, `${AU} AU`, `${km} km`];
    for (let i = 0; i < text.length; i++) {
        c.fillText(text[i], bar.x, bar.y - 20 * (i + 1));
    }

    // Text in the left corner
    let corner = [`Press:`, `s to stop / start`, `+/- to zoom (or scroll)`, `r to reset zoom`, `c to center`, `o to show / hide orbits`];
    for (let i = 0; i < corner.length; i++) {
        c.fillText(corner[i], canvas.width - 200, 30 + (20 * i));
    }

    scaleElement.innerHTML = `Scale: ${formatNumber(scale)}`;
    stopElement.innerHTML = stop ? `<b>S</b>tart` : `<b>S</b>top`;
}

// RUN MAIN LOOP
start();