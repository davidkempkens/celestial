/** 
* Create a celestial body
* @param {String} name Name
* @param {String} center The name of the center body.
* @param {Number} radius The Radius of the body in meters (m).
* @param {Number} distance Distance to the other body in meters (m).
* @param {Number} velocity Velocity relative to its center body in meters per second (m/s).
* @param {Number} mass Mass of the body in Kilogramm (kg).
* @param {String} color Color as String, e.g.: #0F2D23, 'white', 'rgb(0,255,0)'
* @param {String} type Type of the body, e.g. Planet, Dwarf, Asteroid
* @param {String} symbol Symbol
* @param {Number} phi Initial angle: 0 - 2π / 0 - 360°
* @returns {CelestialBody} body Returns an CelestialBody Object.
*/
class CelestialBody {
  constructor(name, center, radius, distance, velocity, mass, color, type, symbol = '', phi = Math.random() * 360) {
    this.name = name;
    this.center = center;
    this.color = color;
    this.originalColor = color
    this.type = type;
    this.symbol = symbol;
    this.satelites = [];

    this.R = radius;
    this.M = center.m;
    this.m = mass;

    // Velocity
    this.v = velocity;

    // Polar coordinates
    this.r = distance;

    this.phi = deg(phi);
    this.w = 0;
    // Cartesion coordinates
    this.x = this.center.x + this.r * Math.cos(this.phi);
    this.y = this.center.y + this.r * Math.sin(this.phi);

    // flag for collision function
    this.isColliding = false;
  }

  run() {

    if (this.center !== Center) {
      this.center.run();
    }
    if (this.r !== 0) {
      this.w = this.v / this.r
      this.phi -= this.w * dt / fps;
      this.phi %= Math.PI * 2;
    }

    this.x = this.center.x + this.r * Math.cos(this.phi);
    this.y = this.center.y + this.r * Math.sin(this.phi);

    this.draw();
  }



  draw() {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.R, 0, Math.PI * 2);
    c.closePath();
    c.fill();
  }

  compare(other) {
    // Draw this body's diameter above this body
    c.fillStyle = this.color;
    c.fillRect(
      this.x - this.R,
      this.y - this.R - 10 / scale,
      this.R * 2,
      2 / scale
    );

    // Draw Compares classes
    let copies = other
      .filter(o => o.name !== this.name)
      .map(o => Object.create(o));
    for (let i = 0; i < copies.length; i++) {
      // Copy other body to alter the x,y position, without changing the orbit of the other body
      copies[i].x = i < 1 ? this.x : copies[i - 1].x;
      copies[i].y =
        i < 1
          ? this.y + this.R + 25 / scale + copies[i].R
          : copies[i - 1].y + copies[i - 1].R + 25 / scale + copies[i].R;
      // DRAW Other Body under this Body or below the other 'other' classes
      c.fillStyle = copies[i].color;
      copies[i].draw();

      if (copies[i].y * scale > 100 && this.R * scale > 30) {
        rescaleDynamic();
        copies[i].drawName();
        scaleDynamic();
      }

      if (copies.length > 2) continue;
      if (i < 1)
        c.fillRect(
          this.x - copies[i].R,
          this.y + this.R + 10 / scale,
          copies[i].R * 2,
          2 / scale
        );
      else
        c.fillRect(
          copies[i - 1].x - copies[i].R,
          copies[i - 1].y + copies[i - 1].R + (10 / scale) * i,
          copies[i].R * 2,
          2 / scale
        );
    }
  }

  drawName() {
    drawText(this.name, this.x + this.R, this.y, this.color, 13);
  }

  collision(other) {
    let distX = this.x - other.x;
    let distY = this.y - other.y;
    let distance = Math.hypot(distX, distY);
    this.isColliding = distance < this.R + other.R;
  }

  drawTrajectory() {
    let rotation = deg(0);
    // this.acc = (this.rp + this.ra) / 2
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = 0.3 / scale;
    // console.log(this.name, (this.a).toFixed())
    c.ellipse(this.center.x - this.e, this.center.y, this.a, this.b, rotation, 0, Math.PI * 2);
    c.stroke();
    c.closePath();
  }

  details() {

    let diameterText = `\u2205 ${formatMeter(this.R * 2)}`
    let textAbove = [diameterText];

    let distanceText = `\u2192 ${formatMeter(this.r)}`
    let velocityText = `v ${formatMeter(this.v)}/s`

    let textAside = (this.type != 'Galaxy' && this.type != 'God') ? [`${this.name} ${this.symbol} ${this.type}`] : [`${this.name} ${this.symbol}`];
    if (this.type === 'Galaxy' || this.type === 'God') textAside.push(diameterText)
    if (this.v > 0) textAside.push(velocityText);
    if (this.acc > 0) textAside.push(`a ${formatMeter(this.acc)}/s²`);
    if (this.f > 0) textAside.push(`f ${formatNumber(this.f.toExponential(2))} kg m/s²`);
    if (this.r > 0) textAside.push(distanceText);
    if (this.m > 0) textAside.push(`Mass: ${formatNumber(this.m.toExponential(2))} kg`);


    if (this.type !== 'Galaxy' && this.type !== 'God') drawText(textAbove, this.x - this.R, this.y - this.R - 25 / scale, this.color, 13);
    drawText(textAside, this.x + this.R / Math.SQRT2, this.y + this.R / Math.SQRT2, this.color, 13);
  }
}
