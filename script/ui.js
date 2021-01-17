// USER INPUT

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
    cameraBody = null;

    startDragOffset.x = e.clientX / scale - center.x;
    startDragOffset.y = e.clientY / scale - center.y;

    // Click on body to camera
    bigBodies.forEach(bB => {
        if (bB.isColliding) {
            cameraBody = bB;
        }
    });
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
        x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
        y: e.touches[0].clientY - canvas.getBoundingClientRect().top
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
        x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
        y: e.touches[0].clientY - canvas.getBoundingClientRect().top
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
window.addEventListener("keypress", e => {
    switch (e.key) {
        case "s":
            stopSpin = !stopSpin;
            break;
        case "o":
            orbit = !orbit;
            break;
        case "f":
            cameraBody = planets[Math.floor(Math.random() * planets.length)];
            break;
        case "a":
            scale = 1e-10;
            break;
        case "c":
            cameraBody = null;
            center.x = canvas.width / 2;
            center.y = canvas.height / 2;
            break;
        case "-":
            scale *= scaleFactor;
            break;
        case "+":
            scale /= scaleFactor;
            break;
        case "z":
            scale = 1;
            break;
        default:
            break;
    }
});

// HUD ELEMENTS
const hud = document.getElementById('hud-top');
const hud2 = document.getElementById('hud-planets');
const hud3 = document.getElementById('hud-moons');

const cameraElement = document.getElementById('camera');
const zoomElement = document.getElementById('zoomElement');
const stopElement = document.getElementById('stopElement');
const orbitElement = document.getElementById('orbitElement');
const plusElement = document.getElementById('plusElement');
const minusElement = document.getElementById('minusElement');

// FILL LIST ON THE RIGHT SIDE
bigBodies.forEach(b => {
    if (b.type != 'Moon') {
        let a = document.createElement('a');
        hud2.appendChild(a);
        a.style.color = b.color;
        a.innerHTML = b.name;
        a.href = '#';
        a.addEventListener('click', () => {
            scale = cameraBody == b ? 10 / b.r : 10 / sun.r;
            cameraBody = b;
        });
        a.addEventListener('mouseover', () => {});
    }
});

// MOON LIST FILLED BOOLEAN
var moonListFilled = false;
var moonCount = 0;
var currentListFrom = null;
// HUD EVENTS
cameraElement.addEventListener('click', () => {
    cameraBody = null;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
})
zoomElement.addEventListener('click', () => scale = 1);
stopElement.addEventListener('click', () => stopSpin = !stopSpin);
orbitElement.addEventListener('click', () => orbit = !orbit);
plusElement.addEventListener('click', () => scale /= scaleFactor);
minusElement.addEventListener('click', () => scale *= scaleFactor);


// Draw bar at the bottom of the canvas to show scale
function ui() {

    // Bar Position
    let bar = {
        x: (canvas.width / 2) - AU,
        w: AU,
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
    let au = formatNumber(AU / scale);
    let ly = formatNumber((1 / 63241.077) / scale);

    let text = [`${ly} light-years`, `${au} AU`, `${km} km`];
    for (let i = 0; i < text.length; i++) {
        c.fillText(text[i], bar.x, bar.y - 20 * (i + 1));
    }

    // HUD
    zoomElement.innerHTML = `<b>Z</b>oom: ${formatNumber(scale)}`;
    stopElement.innerHTML = stopSpin ? `<b>S</b>top` : `<b>S</b>tart`;
    stopElement.style.color = stopSpin ? 'red' : 'green';
    // show current planets that gets follow by the camera in the hud
    if (cameraBody !== null) {

        cameraElement.innerHTML = '<b>C</b>amera: ' + cameraBody.name;
        cameraElement.style.color = cameraBody.color;

        // FILL LIST ON THE RIGHT SIDE
        // IF LIST IS CURRENTLY EMPTY
        if (!moonListFilled) {
            moons.forEach(m => {
                if (m.center == cameraBody) {
                    moonCount++;
                    currentListFrom = m.center;
                    let a = document.createElement('a');
                    hud3.appendChild(a);
                    a.style.color = m.color;
                    a.innerHTML = m.name;
                    a.href = '#';
                    a.addEventListener('click', () => {
                        cameraBody = m;
                    });
                }
            });
            moonListFilled = true;
            if (moonCount > 0) {
                hud3.style = 'display:flex';
            }
            // IF CAMERA BODY CHANGES BUT WITHOUT GOING NULL INBETWEEN
            // CHECK IF CAMERA BODY MATCHES THE CURRENT LIST
        } else {
            if (currentListFrom != cameraBody) {
                // IF CAMERA BODY IS CAHNGED DELETE AND HIDE LIST
                hud3.innerHTML = '';
                hud3.style.display = 'none';
                moonListFilled = false;
                moonCount = 0;
                currentListFrom = null;
            }
        }
    } else {
        // IF CAMERA BODY IS NULL DELETE AND HIDE LIST
        hud3.innerHTML = '';
        hud3.style.display = 'none';
        moonListFilled = false;
        moonCount = 0;
        currentListFrom = null;

        cameraElement.innerHTML = 'Solar System';
        cameraElement.style.color = 'white';
    }
}

// RUN MAIN LOOP
start();