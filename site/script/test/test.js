function gridUnscaled(width, height, color) {

    let tick = 100;
    let tickLength = 3;
    let offSet = 10;

    c.beginPath();
    c.lineWidth = .5;
    c.strokeStyle = color;
    c.fillStyle = color;

    // x-Axis
    c.moveTo(-width / 2, 0);
    c.lineTo(width / 2, 0);
    for (let i = tick; i < width / 2; i += tick) {
        c.moveTo(i, tickLength);
        c.lineTo(i, -tickLength);
        c.fillText(i, i + offSet, tickLength + offSet);

        c.moveTo(-i, tickLength);
        c.lineTo(-i, -tickLength);
        c.fillText(-i, -i + offSet, tickLength + offSet);

        c.arc(0, 0, i, 0, Math.PI * 2)
    }

    // y-Axis
    c.moveTo(0, -height / 2);
    c.lineTo(0, height / 2);
    for (let i = tick; i < height / 2; i += tick) {
        c.moveTo(tickLength, i);
        c.lineTo(-tickLength, i);

        c.fillText(i, tickLength + offSet, i + offSet);

        c.moveTo(tickLength, -i);
        c.lineTo(-tickLength, -i);
        c.fillText(-i, tickLength + offSet, -i - offSet);
    }

    // Draw line to Center
    c.moveTo(0, 0);
    c.lineTo(Center.x, Center.y)

    c.stroke();
    c.closePath();
}

function drawMouseScaled(color) {
    c.beginPath();
    c.strokeStyle = color;
    c.lineWidth = 1 / scale;
    c.arc(mouse.x, mouse.y, mouse.R, 0, Math.PI * 2);
    c.stroke();
    c.closePath();
}


function drawMouseUnscaled(color) {
    c.beginPath();
    c.strokeStyle = color;
    c.lineWidth = 1;
    c.arc(mouse.x, mouse.y, mouse.R, 0, Math.PI * 2);
    c.stroke();
    c.closePath();
}

function gridScaled(width, height, color) {

    // c.translate(width / 2, height / 2);
    // c.scale(1, -1);
    let scaledWidth = width / scale;
    let scaledHeight = height / scale;

    c.lineWidth = 1 / scale;
    c.beginPath();
    c.strokeStyle = color;
    c.arc(Center.x, Center.y, Center.R, 0, Math.PI * 2);
    let tick = AE;
    let tickLength = 3 / scale;

    // x-Axis
    c.moveTo(-scaledWidth / 2, 0);
    c.lineTo(scaledWidth / 2, 0);
    c.stroke();
    for (let i = tick; i < scaledWidth / 2; i += tick) {
        if (i > tick * 1e3) return;
        c.moveTo(i, tickLength);
        c.lineTo(i, -tickLength);

        c.moveTo(-i, tickLength);
        c.lineTo(-i, -tickLength);
    }

    // y-Axis
    c.moveTo(0, -scaledHeight / 2);
    c.lineTo(0, scaledHeight / 2);
    for (let i = tick; i < scaledHeight / 2; i += tick) {
        c.moveTo(tickLength, i);
        c.lineTo(-tickLength, i);


        c.moveTo(tickLength, -i);
        c.lineTo(-tickLength, -i);

    }

    c.stroke();
    c.closePath();
}

function lineFromOriginToCenter(color) {

    c.beginPath();
    c.lineWidth = 1 / scale;
    c.strokeStyle = color;
    c.moveTo(0, 0);
    c.lineTo(Center.x, Center.y);
    c.stroke();
    c.closePath();
}

function debug() {
    gridScaled(canvas.width, canvas.height, 'red');
    lineFromOriginToCenter('blue');
    drawMouseScaled('green');
    drawText('test', 100, 100, 'red', 13)

}

function debugUnscaled() {
    gridUnscaled(canvas.width, canvas.height, 'white');
    drawMouseUnscaled('white');
}
