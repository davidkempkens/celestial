// GLOBALS

// GET CANVAS ELEMENT & DRAWING CONTEXT FROM THE DOM
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const img = document.getElementById('img');

// Set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Parameter for camera function to center object on canvas
var cameraBody = null;
// Booleans to toggle in main loop - for user input
var stopSpin = false;
var orbit = true;
// SCALING AND TRANSLATION GLOBALS
var scale = 1;
var scaleFactor = .9;
var trans = {
    x: 0,
    y: 0
}

// Scale for radius
var scaleR = 1;
// Scale for distances
var scaleD = 1;
// Scale for time - 1 = REAL TIME 1s = 1s
var scaleT = 60 * 60 * 24;
var currentTimeUnit = 'h';
switch (scaleT) {
    case 1:
        currentTimeUnit = 's';
        break;
    case 60:
        currentTimeUnit = 'm';
        break;
    case 60 * 60:
        currentTimeUnit = 'h';
        break;
    case 60 * 60 * 24:
        currentTimeUnit = 'd';
        break;
    case 60 * 60 * 24 * 365:
        currentTimeUnit = 'y';
        break;
    default:
        break;
}
// Scale for velocity 1 / 60e6
var scaleV = (1 / 60e6) * scaleT;
// TIMER FOR MEASURING
var startTime = 0;
// 30 km * 60s * 60m * 24h * 365d = 946.080.000 km around the sun
// 

// SPEED OF LIGHT - C
const C = 299792.458;
// AU - in Mio km
const AU = 150;
// Light year in AU
const ly = 63241.077 * AU;
// Solar Mass in KG
const solarMass = 2e30;
// Solar Radius in Mio km
const solarRadius = .695700;

// BACKGROUND COLOR THAT GETS DRAWN EVERY FRAME TO CLEAR THE CANVAS
var bg = '#050a10';
// Frame Animation ID - used to cancel / start frame animatinons
var frAId;

// Mouse objects and booleans - for user input via mouse
var mouse = {
    x: 0,
    y: 0,
    r: 30 / scale
};

var startDragOffset = {};
var mouseDown = false;

// Center Object for as center of the "Universe / Solar System"
const center = {
    name: 'Center',
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 0
}

// Symbols as Unicode for the planets in the solar system
var symbols = {
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
    sun: '\u{1F31E}'
}

// Resize Canvas
function resizeCanvas() {
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
// Return angle
function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

// Formats Big Numbers
function formatNumber(num) {
    return num.toLocaleString("en-US", {
        notation: "compact",
        compactDisplay: "long",
        maximumSignificantDigits: "2"
    })
}

setInterval(timer, 1000);

function timer() {
    var d = new Date();
    var t = d.toLocaleString();
    startTime++;
    console.log(startTime, currentTimeUnit);
};

// DRAW Text at scale and translated coords
function drawText(t, coord, f, translated) {
    let lineX, lineY;
    c.fillStyle = coord.color;
    c.font = "13px Consolas";
    if (translated) {
        lineX = ((coord.x + coord.r) * scale) + trans.x + f;
        lineY = (coord.y * scale) + trans.y;
    } else {
        // CURRENTLY NOT WORKING
        // c.setTransform(1, 0, 0, 1, 0, 0);
        lineX = coord.x + coord.r + f;
        lineY = coord.y;
        // c.resetTransform();
    }

    if (t instanceof Array) {
        for (let i = 0; i < t.length; i++) {
            c.fillText(t[i], lineX, lineY + f * i);
        }
    } else {
        c.fillText(t, lineX, lineY);
    }
}