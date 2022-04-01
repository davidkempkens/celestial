class Photon extends FlyingBody {

    run() {
        super.run();
        this.draw();
    }


    draw() {
        super.draw();
        this.flightPath();
        this.radioWave();
    }

    radioWave() {
        let d = this.d % .5;
        let wave = {
            x: this.x - d,
            y: this.y,
            h: this.r,
            line: 1 / scale,
            i: .005,
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
}