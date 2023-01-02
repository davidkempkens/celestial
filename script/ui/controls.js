// USER INPUT
// noinspection JSUndeclaredVariable

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

    // cancel Camera sticking to current planet
    cameraBody = null;

    startDragOffset.x = e.clientX / scale - Center.x;
    startDragOffset.y = e.clientY / scale - Center.y;

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
        Center.x = e.clientX / scale - startDragOffset.x;
        Center.y = e.clientY / scale - startDragOffset.y;
    }

    // Collision detection on mouse over classes
    const bCR = canvas.getBoundingClientRect();

    // Update Mouse Coords on Mouse Move in Mouse object
    mouse = {
        // Actual Mouse Coordinates - offSet (start Canvas) - Translation / current scale
        x: (e.clientX - bCR.x - trans.x) / scale,
        y: (e.clientY - bCR.y - trans.y) / scale,
        // Distance needed to collide with Bodies etc.
        R: 30 / scale,
    };

    runCollisionDetection();
}

// HANDLE KEYBOARD EVENTS
window.addEventListener("keypress", e => {
    switch (e.key) {
        case "t":
            toggleTime();
            break;
        case "h":
            toggleHUD();
            break;
        case "s":
            stopTime = !stopTime;
            break;
        case "o":
            showTrajectories = !showTrajectories;
            break;
        case "f":
            cameraBody = planets[Math.floor(Math.random() * planets.length)];
            break;
        case "a":
            scale *= 1e-1;
            break;
        case "d":
            scale /= 1e-1;
            break;
        case "c":
            cameraBody = null;
            Center.x = canvas.width / 2;
            Center.y = canvas.height / 2;
            break;
        case "-":
            zoomOut();
            break;
        case "+":
            zoomIn();
            break;
        case "z":
            scale = 1e-9;
            break;
        default:
            break;
    }
});

// HUD ELEMENTS
const hud = document.getElementById('hud-top');
const hudPlanets = document.getElementById('hud-planets');
const hudMoons = document.getElementById('hud-moons');
const hudSuns = document.getElementById('hud-suns');
const hudOther = document.getElementById('hud-other');

const hudElements = document.querySelectorAll('.hud');


let hideHUD = false;
const hideHUDElement = document.getElementById('hideElement')
const cameraElement = document.getElementById('camera');
const zoomElement = document.getElementById('zoomElement');
const stopElement = document.getElementById('stopElement');
const orbitElement = document.getElementById('orbitElement');
const timeElement = document.getElementById('timeElement');
const plusElement = document.getElementById('plusElement');
const minusElement = document.getElementById('minusElement');

const clockElement = document.getElementById('clockElement')

hideHUDElement.addEventListener('click', toggleHUD);

function toggleHUD() {
    hideHUD = !hideHUD;
    hudElements.forEach(h => {
        if (h.id !== 'nav-hud' && h.id !== 'time-hud')
            h.style.display = hideHUD ? 'none' : 'flex';
    });
}

// MOON LIST FILLED BOOLEAN
let moonListFilled = false;
let moonCount = 0;
let currentListFrom = null;
// HUD EVENTS
cameraElement.addEventListener('click', () => {
    cameraBody = null;
    Center.x = canvas.width / 2;
    Center.y = canvas.height / 2;
});
zoomElement.addEventListener('click', () => scale = 1e-9);
stopElement.addEventListener('click', () => stopTime = !stopTime);
orbitElement.addEventListener('click', () => showTrajectories = !showTrajectories);
plusElement.addEventListener('click', zoomIn);
minusElement.addEventListener('click', zoomOut);

// HOLD + or - TO keep zooming
let plusPressed = false;
let minusPressed = false;
plusElement.addEventListener('mousedown', () => plusPressed = true);
minusElement.addEventListener('mousedown', () => minusPressed = true);
plusElement.addEventListener('mouseup', () => plusPressed = false);
minusElement.addEventListener('mouseup', () => minusPressed = false);
plusElement.addEventListener('mouseout', () => plusPressed = false);
minusElement.addEventListener('mouseout', () => minusPressed = false);

let i = 0;
timeElement.addEventListener('click', toggleTime);

// Draw bar at the bottom of the canvas to show scale
function controls() {
    if (plusPressed) zoomIn();
    if (minusPressed) zoomOut();
    // BAR
    let bar = {
        x: (canvas.width / 2) - AE * 1e-9,
        w: AE * 1e-9,
        y: canvas.height - (canvas.height / 30),
        R: 0
    }

    // Draw Lines
    c.beginPath();
    c.fillStyle = 'white';
    c.fillRect(bar.x, bar.y, bar.w, 1);
    c.fillRect(bar.x, bar.y - 6, 1, 12);
    c.fillRect(bar.x + bar.w, bar.y - 6, 1, 12);
    c.closePath();

    // Text above bar
    let km = formatNumber(AE * 1e-12 / scale);
    let au = formatNumber(1e-9 / scale);
    let ly = formatNumber((AE * 1e-9 / LY) / scale);
    // 0.0000158125074 LY = 1 AU

    let text = [`${ly} light-years`, `${au} AU`, `${km} km`];
    for (let i = 0; i < text.length; i++) {
        c.fillText(text[i], bar.x, bar.y - 20 * (i + 1));
    }

    // HUD
    timeElement.innerHTML = `<b>T</b>ime/s 1 ${timeControl[i][0]}`;
    clockElement.innerHTML = `${secToTime(clock)}`
    zoomElement.innerHTML = `<b>Z</b>oom: ${formatNumber(scale.toExponential(2))}`;
    stopElement.innerHTML = stopTime ? `<b>S</b>tart` : `<b>S</b>top`;
    stopElement.style.color = stopTime ? 'green' : 'red';

    // show current planets that gets follow by the camera in the hud
    if (cameraBody !== null) {
        cameraElement.innerHTML = cameraBody.name;
        cameraElement.style.color = cameraBody.color;
        // FILL LIST ON THE RIGHT SIDE
        // IF LIST IS CURRENTLY EMPTY

        if (!moonListFilled) {
            let arr = [...moons, ...satellites];
            arr.forEach(m => {
                if (m.center === cameraBody) {
                    moonCount++;
                    currentListFrom = m.center;
                    const a = document.createElement('a');
                    hudMoons.appendChild(a);
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
                hudMoons.style.display = 'flex';
            }
            // IF CAMERA BODY CHANGES BUT WITHOUT GOING NULL IN BETWEEN
            // CHECK IF CAMERA BODY MATCHES THE CURRENT LIST
        } else {
            if (currentListFrom !== cameraBody) {
                // IF CAMERA BODY IS CHANGED DELETE AND HIDE LIST
                hudMoons.innerHTML = '';
                hudMoons.style.display = 'none';
                moonListFilled = false;
                moonCount = 0;
                currentListFrom = null;
            }
        }
    } else {
        // IF CAMERA BODY IS NULL DELETE AND HIDE LIST
        hudMoons.innerHTML = '';
        hudMoons.style.display = 'none';
        moonListFilled = false;
        moonCount = 0;
        currentListFrom = null;

        cameraElement.innerHTML = 'Solar System';
        cameraElement.style.color = 'white';
    }
}