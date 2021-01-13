// GLOBALS

// GET CANVAS ELEMENT & DRAWING CONTEXT FROM THE DOM
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

// Set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 
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

// BACKGROUND COLOR THAT GETS DRAWN EVERY FRAME TO CLEAR THE CANVAS
var bg = '#050a10';
// Frame Animation ID - used to cancel / start frame animatinons
var frAId;

// Mouse object in global scope
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
    sun: '\u{1F31E}',
    poop: '\u{1F4A9}',
    rocket: '\u{1F680}',
    ymcmb: '\u{1F4AF}'
}

// Convert degrees to radians
function deg(d) {
    return d * (Math.PI / 180);
}
// Formats Big Numbers
function formatNumber(num) {
    return num.toLocaleString("en-US", {
        notation: "compact",
        compactDisplay: "long",
        maximumSignificantDigits: "2"
    })
}

// DRAW SCALE BAR
function bar() {

    // BAR POSITION
    let xStart = (canvas.width / 2);
    let barWidth = (canvas.width / 9);
    let y = canvas.height - (canvas.height / 30);

    // DRAW BAR
    c.beginPath();
    c.fillStyle = 'white';
    c.fillRect(xStart, y, barWidth, 1);
    c.fillRect(xStart, y - 6, 1, 12);
    c.fillRect(xStart + barWidth, y - 6, 1, 12);
    c.closePath();

    let bar = {
        x: (canvas.width / 2),
        y: canvas.height - (canvas.height / 3),
        r: 0
    }

    // TEXT ABOVE BAR
    let km = formatNumber((earth.d * 1000000) / scale);
    let AU = formatNumber(1 / scale);
    let ly = formatNumber((1 / 63241.077) / scale);

    let text = [`${ly} light-years`, `${AU} AU`, `${km} km`];

    for (let i = 0; i < text.length; i++) {
        c.fillText(text[i], xStart, y - 20 * (i + 1));
    }

    // Text beside Bar (right side)
    c.fillText(`Scale: ${formatNumber(scale)}`, xStart + barWidth + 20, y);
}

// DRAW Text at scale and translated coords
function drawText(t, coord, f, translated) {
    let lineX, lineY;
    c.fillStyle = coord.color;
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