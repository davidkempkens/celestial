// HANDLE TOUCH EVENTS - EXPERIMENTAL
// Send touch positions to mouse event
document.body.addEventListener("touchstart", e => {
    e.preventDefault();
    let touch = {
        x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
        y: e.touches[0].clientY - canvas.getBoundingClientRect().top
    };

    let mE = new MouseEvent("mousedown", {
        clientX: touch.x,
        clientY: touch.y,
    });
    canvas.dispatchEvent(mE);
});

document.body.addEventListener("touchmove", e => {
    e.preventDefault();
    let touch = {
        x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
        y: e.touches[0].clientY - canvas.getBoundingClientRect().top
    };
    let mE = new MouseEvent("mousemove", {
        clientX: touch.x,
        clientY: touch.y,
    });
    canvas.dispatchEvent(mE);
});

document.body.addEventListener("touchend", () => {
    let mE = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mE);
});

plusElement.addEventListener('touchstart', e => {
    e.preventDefault();
    plusPressed = true;
});
plusElement.addEventListener('touchend', () => plusPressed = false);
plusElement.addEventListener('touchcancel', () => plusPressed = false);

minusElement.addEventListener('touchstart', e => {
    e.preventDefault();
    minusPressed = true;
});
minusElement.addEventListener('touchend', () => minusPressed = false);
minusElement.addEventListener('touchcancel', () => minusPressed = false);