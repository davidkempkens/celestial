class Probe extends FlyingBody {

    run() {
        super.run();
        this.draw();
    }

    draw() {
        c.drawImage(img, this.x, this.y - this.R / 2, this.R, this.R);
        this.flightPath();
    }

    details() {
        super.details()
        // let textAbove = [`\u2192 ${(this.d / 150).toPrecision(14)} AU`];
        // if(toLy(this.d) > 0) {
        //     textAbove = [`\u2192 ${formatNumber(toLy(this.d))} ly`];
        // }
        // let textAbove = toLy(this.d) > 1 ?`\u2192 ${formatNumber(toLy(this.d))} ly`: `\u2192 ${(this.d / 150).toPrecision(14)} AU`;
        let textAbove = toLy(this.r) > 0 ? `\u2192 ${formatNumber(toLy(this.r))} ly` : `\u2192 ${formatNumber(this.r * 1e-3)} km`;
        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.R * 2, this.y - this.R - (25 / scale), this.color, 13);
    }
}