// USER INPUT

// HANDLE MOUSE EVENTS
// SCALE CANVAS WITH SCROLL
window.addEventListener('wheel', e => {
    let z = e.deltaY / 100;
    scale *= scaleFactor ** z;
});

// DRAG CANVAS
canvas.addEventListener("mousedown", down);
canvas.addEventListener("mousemove", move);
canvas.addEventListener("mouseup", () => mouseDown = false);
canvas.addEventListener('mouseover', () => mouseDown = false);
canvas.addEventListener('mouseout', () => mouseDown = false);

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
        // Distance needed to collide with Bodies etc.
        r: 30 / scale
    }
}

// HANDLE TOUCH EVENTS - EXPERIMENTAL
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

// Send touch positions to mouse event
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
    var touch = {
        x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
        y: e.touches[0].clientY - canvas.getBoundingClientRect().top
    }
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

// HANDLE KEYBOARD EVENTS
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

// BUTTONS
const resetBtn = document.getElementById('resetBtn');
const centerBtn = document.getElementById('centerBtn');
const orbitBtn = document.getElementById('orbitBtn');

resetBtn.addEventListener('click', () => scale = 1);
centerBtn.addEventListener('click', () => {
    cameraPlanet = null;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
});
orbitBtn.addEventListener('click', () => orbit = !orbit);

// SIDENAV MENU
const sideNav = document.getElementById('sidenav');