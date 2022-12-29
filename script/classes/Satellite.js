class Satellite extends Planet {

    draw() {
        c.drawImage(sat, this.x, this.y - this.R / 2, this.R, this.R);
    }

    info() {
        let distanceText =
            toLy(this.r) > 0
                ? `\u2192 ${formatNumber(toLy(this.r))} ly `
                : `\u2192 ${formatNumber((this.r - this.center.R) * 1e-3)} km `;
        let textAbove = [`\u2205 ${formatNumber(this.R * 2 * 1e-3)} km`]; // DEFAULT TEXT ABOVE BODY IS DIAMETER
        let textAside = [
            `${this.name} ${this.symbol} ${this.type}`, // Display Symbols
            `${formatNumber(this.v * 1e-3)} km/s `, // Display Velocity
            distanceText, // Display Distance
            `Mass: ${formatNumber(this.m.toExponential(2))} kg`, // Display Type
        ];

        // CALL TEXT FUNCTION
        drawText(textAbove, this.x - this.R * 2, this.y - this.R - 25 / scale, this.color, 13);
        drawText(textAside, this.x + this.R, this.y, this.color, 13);
    }
}