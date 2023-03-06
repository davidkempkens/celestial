// GLOBALS

// GET CANVAS ELEMENT & DRAWING CONTEXT FROM THE DOM
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const img = document.getElementById('img');
const sat = document.getElementById('satellite');

// Set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Booleans to toggle in main loop - for user input
let stopTime = false;
let showTrajectories = false;

// SCALING AND TRANSLATION GLOBALS
let scale = 1e-9;
let scaleFactor = .9;

let showGrid = false;
let trans = {
    x: 0,
    y: 0
}

timeControl = [
    ['sec', 1],
    ['min', 60],
    ['hour', 60 * 60],
    ['day', 60 * 60 * 24],
    ['week', 60 * 60 * 24 * 7],
    ['month', 60 * 60 * 24 * 30],
    ['year', 60 * 60 * 24 * 365],
    //     ['tsd years', 60 * 60 * 24 * 365 * 1000],
    //     ['mio years', 60 * 60 * 24 * 365 * 1000000],
    //     ['bio years', 60 * 60 * 24 * 365 * 1000000000],
    //     ['trio years', 60 * 60 * 24 * 365 * 1000000000000]
]


const MIN = 60;
const HOUR = 60 * 60;
const DAY = 60 * 60 * 24;
const WEEK = 60 * 60 * 24 * 7;
const MONTH = 60 * 60 * 24 * 30;
const YEAR = 60 * 60 * 24 * 365;

// Time in seconds
let clock = 0;
let frames = 0;

// Scale for time - 1 = REAL TIME 1s = 1s
let fps = 60;
let dt = 1;
let softening = 1
let gravityOn = true

// SPEED OF LIGHT - C
const C = 299792458;

// Gravitational Constant
const G = 6.67430e-11;

// AU - in m
const AE = 149597870700;

// Light year in m
const LY = 9460730472580800;
// Solar Mass in KG
const SOLAR_MASS = 1.98847e30;
// Solar Radius in m
const SOLAR_RADIUS = 6.96342e8;

// BACKGROUND COLOR THAT GETS DRAWN EVERY FRAME TO CLEAR THE CANVAS
const bg = '#050a10';

// Frame Animation ID - used to cancel / start frame animations
let frAId;


let maxRenderDistance = canvas.width * 10;
let minRenderDistance = 5;

// Mouse objects and booleans - for user input via mouse
let mouse = {
    x: 0,
    y: 0,
    R: 30 / scale
};

let startDragOffset = {};
let mouseDown = false;

// Center Object for as center of the "Universe / Solar System"
const Center = {
    name: 'Center',
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 0,
    mass: 1,
    m: 1,
    R: SOLAR_RADIUS
}

// Parameter for camera function to center object on canvas
let cameraBody = null;


const initialDeg = {
    mercury: 180,
    venus: 300,
    earth: 0,
    mars: 270,
    jupiter: 210,
    saturn: 240,
    uranus: 135,
    neptune: 190,
    eros: 165,
    ceres: 90,
    pluto: 260,
    eris: 170,
    makemake: 10,
    moon: 135
}

// Resize Canvas
function resizeCanvas() {
    let dpr = window.devicePixelRatio;
    c.scale(1 / dpr, 1 / dpr);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Clear Canvas every frame - background color as global variable
function clearCanvas() {
    c.fillStyle = bg;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// Convert degrees to radians
function deg(d) {
    return d * (Math.PI / 180);
}

function formatNumber(num) {
    try {
        return num.toLocaleString("en-US", {
            notation: "compact",
            compactDisplay: "long",
            maximumSignificantDigits: 3
        });
    } catch (error) {
        return 'Format Error' + error
    }
}

function formatMeter(m) {

    if (m < 1e-27) return `${(m * 1e30).toFixed(0)} qm (m⁻³⁰)`
    if (m < 1e-24) return `${(m * 1e27).toFixed(0)} rm (ᵐ⁻²⁷)`
    if (m < 1e-21) return `${(m * 1e24).toFixed(0)} ym (m⁻²⁴)`
    if (m < 1e-18) return `${(m * 1e21).toFixed(0)} zm (m⁻²¹)`
    if (m < 1e-15) return `${(m * 1e18).toFixed(0)} am (m⁻¹⁸)`
    if (m < 1e-12) return `${(m * 1e15).toFixed(0)} fm (m⁻¹⁵)`
    if (m < 1e-9) return `${(m * 1e12).toFixed(0)} pm (m⁻¹²)`
    if (m < 1e-6) return `${(m * 1e9).toFixed(0)} nm (m⁻⁹)`
    if (m < 1e-3) return `${(m * 1e6).toFixed(0)} μm (m⁻⁶)`
    if (m < 1e-2) return `${(m * 1e3).toFixed(0)} mm (m⁻³)`
    if (m < 1) return `${(m * 100).toFixed(0)} cm`
    if (m < 1e3) {
        try {
            return new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "long",
                // maximumSignificantDigits: 3
            }).format(m) + ' m'
        } catch (error) {
            return error
        }
    }

    // (1 ly = 9 460 730 472 580 800 m)
    if (m < LY) {
        try {
            return new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "long",
                // maximumSignificantDigits: 3
            }).format(m * 1e-3) + ' km'
        } catch (error) {
            return error
        }
    } else {
        try {
            return new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "long",
                // maximumSignificantDigits: 3
            }).format(toLy(m)) + ' ly'
        } catch (error) {
            return error
        }
    }
}

function drawText(t, x, y, color, f) {
    let lineX, lineY;
    c.fillStyle = color;
    c.font = "13px Consolas";
    lineX = (x * scale) + trans.x + f;
    lineY = (y * scale) + trans.y;
    if (t instanceof Array) {
        for (let i = 0; i < t.length; i++) {
            c.fillText(t[i], lineX, lineY + f * i);
        }
    } else {
        c.fillText(t, lineX, lineY);
    }
}

function updateHUD(bodies, hud) {

    bodies.forEach(b => {
        const a = document.createElement('a');
        hud.appendChild(a);
        a.style.color = b.color;
        a.innerHTML = b.name;
        a.href = '#';
        a.addEventListener('click', () => {
            // scale = cameraBody === b ? 10 / b.R : sun.R * 1e-16;
            scale = 40 / b.R;
            cameraBody = b;
        });
        // a.addEventListener('mouseover', () => {});
    });
}

function zoomIn() {
    scale /= scaleFactor;
}

function zoomOut() {
    scale *= scaleFactor;
}

function toggleTime() {
    i = ++i % timeControl.length;
    dt = timeControl[i][1] * 1 / fps;
}

function secToTime(s) {

    let years = Math.floor(s / (60 * 60 * 24 * 365));
    s -= years * (60 * 60 * 24 * 365);

    let days = Math.floor(s / (60 * 60 * 24));
    s -= days * (60 * 60 * 24);

    let hours = Math.floor(s / (60 * 60));
    s -= hours * (60 * 60);

    let minutes = Math.floor(s / 60);
    s -= minutes * 60;

    let seconds = Math.floor(s);

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${formatNumber(years)} y ${days} d - ${hours}:${minutes}:${seconds}`;
}

// km to light-years
function toLy(m) {
    if (m > LY) return Math.floor(m / LY);
}

function polarToCartesian(r, phi) {
    return r * Math.cos(phi), r * Math.sin(phi);
}

function cartesianToPolar(x, y) {
    return Math.sqrt(x ** 2 + y ** 2), Math.atan2(y, x);
}

function distance(a, b) {
    let rx = b.x - a.x
    let ry = b.y - a.y
    return Math.sqrt(rx ** 2 + ry ** 2)
}

function midpoint(a, b) {
    let dx = b.x - a.x
    let dy = b.y - a.y
    return { x: a.x + dx / 2, y: a.y + dy / 2 }
}

function drawArrow(from, to, length, color) {

    let k = 12 / scale
    let dx = to.x - from.x
    let dy = to.y - from.y

    let theta = Math.atan2(dy, dx)
    let phi = 20 * Math.PI / 180
    let beta = Math.PI / 2 - theta - phi

    let tip = {
        x: from.x + length * Math.cos(theta),
        y: from.y + length * Math.sin(theta)
    }

    let leftTip = {
        x: tip.x - k * Math.sin(beta),
        y: tip.y - k * Math.cos(beta)
    }

    let rightTip = {
        x: tip.x - k * Math.cos(phi - theta),
        y: tip.y + k * Math.sin(phi - theta)
    }

    c.lineWidth = 2 / scale
    c.strokeStyle = color
    c.beginPath()
    c.moveTo(from.x, from.y)
    c.lineTo(tip.x, tip.y)
    c.moveTo(tip.x, tip.y)
    c.lineTo(leftTip.x, leftTip.y)
    c.moveTo(tip.x, tip.y)
    c.lineTo(rightTip.x, rightTip.y)
    c.stroke()
    c.closePath()
}