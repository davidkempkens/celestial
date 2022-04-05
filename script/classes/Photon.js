class Photon extends FlyingBody {

    run() {
        super.run();
        this.draw();
    }


    draw() {
        super.draw();
        this.drawOrbit()
        this.flightPath();
        this.radioWave();
    }

    radioWave() {
        // length of sine curve
        let d = this.d % .5;
        let wave = {
            x: this.x - d,
            y: this.y,
            // Amplitude of sine curve
            h: this.r,
            // Thickness of line
            line: 1 / scale,
            // Points per period
            i: .005,
            // Angular frequency
            m: 100
        }

        c.beginPath();
        c.strokeStyle = 'red';
        c.lineWidth = wave.line;
        c.moveTo(wave.x, wave.y);
        for (let i = 0; i < d; i += wave.i) {
            c.moveTo(wave.x + i - wave.i, wave.y + Math.sin((i - wave.i) * wave.m) * wave.h);
            c.lineTo(wave.x + i, wave.y + Math.sin(i * wave.m) * wave.h);
        }
        c.closePath();
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'blue';
        c.lineWidth = wave.line;
        c.moveTo(wave.x, wave.y);
        for (let i = 0; i < d; i += wave.i) {
            c.moveTo(wave.x + i - wave.i, wave.y - Math.sin((i - wave.i) * wave.m) * wave.h);
            c.lineTo(wave.x + i, wave.y - Math.sin(i * wave.m) * wave.h);
        }
        c.closePath();
        c.stroke();

    }

    info() {
        super.info()
        let textAbove = toLy(this.d) > 0 ?`\u2192 ${formatNumber(toLy(this.d))} ly`: `\u2192 ${formatNumber(this.d * 1e6)} km`;
        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.r * 2, this.y - this.r - (25 / scale), this.color, 13);
    }
}