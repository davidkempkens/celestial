class Photon extends FlyingBody {


    constructor(name, center, radius, distance, veloctiy, mass, color, type) {
        super(name, center, radius, distance, veloctiy, mass, color, type);
        this.rainbow = ['#2F00AA', '#0000FF', '#00A9FF', '#00FFF5', '#48FF00', '#FFFF00', '#FF7F00', '#FF0000'].reverse();
    }

    run() {
        super.run();
        this.draw();
    }


    draw() {
        super.draw();
        if (scale > 1e7) this.white();
        else this.spectrum();
        this.flightPath();
        // this.radioWave();

    }

    spectrum() {
        this.rainbow.forEach((col, i, rain) => {
            c.beginPath();
            c.strokeStyle = col;
            c.lineWidth = 2 / scale;
            c.arc(this.center.x, this.center.y, Math.abs(this.r - (rain.length - i) * 1e9), 0, Math.PI * 2);
            c.stroke();
            c.closePath();
        });

    }

    white() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = 2 / scale;
        c.arc(this.center.x, this.center.y, this.r, 0, Math.PI * 2);
        c.stroke();
        c.closePath();
    }

    radioWave() {
        // length of sine curve
        let r = this.r % .5;
        let wave = {
            x: this.x - r,
            y: this.y,
            // Amplitude of sine curve
            h: this.R,
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
        for (let i = 0; i < r; i += wave.i) {
            c.moveTo(wave.x + i - wave.i, wave.y + Math.sin((i - wave.i) * wave.m) * wave.h);
            c.lineTo(wave.x + i, wave.y + Math.sin(i * wave.m) * wave.h);
        }
        c.closePath();
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'blue';
        c.lineWidth = wave.line;
        c.moveTo(wave.x, wave.y);
        for (let i = 0; i < r; i += wave.i) {
            c.moveTo(wave.x + i - wave.i, wave.y - Math.sin((i - wave.i) * wave.m) * wave.h);
            c.lineTo(wave.x + i, wave.y - Math.sin(i * wave.m) * wave.h);
        }
        c.closePath();
        c.stroke();

    }

    info() {
        // super.info()
        let textAside = [
            `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
            `299 792 458 m/s `, // Display Velocity
        ];
        // CALL TEXT FUNCTION
        drawText(textAside, this.x + this.R, this.y, this.color, 13);
        let textAbove = toLy(this.r) > 0 ? `\u2192 ${formatNumber(toLy(this.r))} ly` : `\u2192 ${formatNumber(this.r * 1e-3)} km`;
        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.R * 2, this.y - this.R - (25 / scale), this.color, 13);
    }
}