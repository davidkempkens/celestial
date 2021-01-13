// UTILITIES

// HTML ELEMENTS
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

// Fit Canvas Element into its container
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center Object for the Sun
const center = {
    name: 'Center',
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 0
}

// Center Initialized
center.x = canvas.width / 2;
center.y = canvas.height / 2;

const fontsize = 12;

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

    // TEXT Beside Bar
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