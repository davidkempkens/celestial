// GLOBALS

// GET CANVAS ELEMENT & DRAWING CONTEXT FROM THE DOM
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const img = document.getElementById('img');

// Set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Booleans to toggle in main loop - for user input
let stopTime = false;
let showTrajectories = false;

// SCALING AND TRANSLATION GLOBALS
let scale = 1e-9;
let scaleFactor = .9;
let trans = {
    x: 0,
    y: 0
}

const scales = {
    fullSun: 5e-7,
    inner: 1e-9,
    outer: 5e-11,
    oort: 1e-12,
    out: 1e-14
}

timeControl = [
    ['sec', 1],
    ['min', 60],
    ['hour', 60 * 60],
    ['day', 60 * 60 * 24],
    ['week', 60 * 60 * 24 * 7],
    ['month', 60 * 60 * 24 * 30],
    ['year', 60 * 60 * 24 * 365],
    ['millennium', 60 * 60 * 24 * 365 * 1000],
    ['mio year', 60 * 60 * 24 * 365 * 1000000]
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

// SPEED OF LIGHT - C
const C = 299792458;

// Gravitational Constant
const G = 6.67430e-11;

// AU - in m
const AE = 149597870700;

// Light year in m
const LY = 9460730472580800;
// Solar Mass in KG
const SOLAR_MASS = 1.9885e30;

// Solar Radius in m
const SOLAR_RADIUS = 696342000;

// BACKGROUND COLOR THAT GETS DRAWN EVERY FRAME TO CLEAR THE CANVAS
const bg = '#050a10';

// Frame Animation ID - used to cancel / start frame animations
let frAId;

// Mouse objects and booleans - for user input via mouse
let mouse = {
    x: 0,
    y: 0,
    R: 3e1 / scale
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

// Symbols as Unicode for the planets in the solar system
const symbols = {
    mercury: '\u263F',
    venus: '\u2640',
    earth: '\u{1F728}',
    mars: '\u2642',
    jupiter: '\u2643',
    saturn: '\u2644',
    uranus: '\u26E2',
    neptune: '\u2646',
    ceres: '\u26B3',
    pluto: '\u2647',
    moon: '\u263D',
    sun: '\u{1F31E}',
    c: '\u03B3'
};

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

// Format Big Numbers
function formatNumber(num) {
    // noinspection JSCheckFunctionSignatures
    return num.toLocaleString("en-US", {
        notation: "compact",
        compactDisplay: "long",
        maximumSignificantDigits: 4
    })
}

// DRAW Text at scale and translated coords
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
            scale = cameraBody === b ? 10 / b.R : sun.R * 1e-16;
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
function toLy(km) {
    if (km > LY) return Math.floor(km / LY)
}

function polarToCartesian(r, phi) {
    return r * Math.cos(phi), r * Math.sin(phi);
}

function cartesianToPolar(x, y) {
    return Math.sqrt(x ** 2 + y ** 2), Math.atan2(y, x);
}