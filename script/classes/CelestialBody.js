// Name - Center - Radius(m) - Periapsis(m) - Apoapsis(m) - Mass(kg) - Color - Type
class CelestialBody {
  constructor(
    name,
    center,
    radius,
    periapsis,
    apoapsis,
    mass,
    color,
    type
  ) {
    this.name = name;
    this.center = center;
    this.color = color;
    this.type = type;
    this.symbol = symbols[name.toLowerCase()] || "";
    this.satelites = [];

    this.R = radius;
    this.M = center.m;
    this.m = mass;
    this.rp = periapsis;
    this.ra = apoapsis;

    // Ellipse Properties
    this.a = (this.rp + this.ra) / 2;
    this.b = this.a * Math.sqrt(1 - this.eps ** 2);
    this.e = Math.sqrt(this.a ** 2 - this.b ** 2);

    // Energy
    this.E = -G * this.M * this.m / (2 * this.a);

    // Angular momentum
    this.L = Math.sqrt(2 * G * this.M * this.m ** 2 * ((this.rp * this.ra) / (this.ra + this.rp)));

    // Parameter p, k, eps
    this.p = this.L ** 2 / (G * this.M * this.m ** 2);
    this.k = 2 * this.m * this.L ** 2 / (G * this.M * this.m ** 2) ** 2;

    // Eccentricity
    this.eps = Math.sqrt(1 + this.k * this.E);

    // Distance r in dependence of angle phi - r(phi)=p/(1+eps cos phi)
    // Polar coordinates
    this.phi = isNaN(initialDeg[this.name.toLowerCase()])
      ? Math.random() * deg(360)
      : deg(initialDeg[this.name.toLowerCase()]);
    this.r = this.p / (1 + this.eps * Math.cos(this.phi));

    // Orbital velocity
    this.v = Math.sqrt(G * (this.M + this.m) * ((2 / this.r) - (1 / this.a)));

    // Angular velocity
    this.w = this.v / this.r;

    // Cartesion coordinates
    this.x = this.r * Math.cos(this.phi);
    this.y = this.r * Math.sin(this.phi);

    // flag for collision function
    this.isColliding = false;
  }

  run() {
    // Physics for orbiting Bodies - Update angular velocity
    this.v = Math.sqrt(G * (this.M + this.m) * ((2 / this.r) - (1 / this.a)));
    this.r = this.p / (1 + this.eps * Math.cos(this.phi));
    this.w = this.v / this.r
    this.phi -= this.w * dt;
    this.x = this.center.x + this.r * Math.cos(this.phi);
    this.y = this.center.y + this.r * Math.sin(this.phi);

    // Call the draw function to draw the body as filled circle on the canvas
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
      .filter((o) => o.name !== this.name)
      .map((o) => this.copy(o));
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

      // rescaleDynamic()
      // copies[i].drawName();
      // scaleDynamic()

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

  hover() {
    this.R *= 5;
    this.draw();
    this.R /= 5;
  }

  collision(other) {
    let distX = this.x - other.x;
    let distY = this.y - other.y;
    let distance = Math.hypot(distX, distY);
    this.isColliding = distance < this.R + other.R;
  }

  drawOrbit() {
    let rotation = deg(0);

    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = 0.3 / scale;
    // ellipses center coords (x,y), (Major) x-radius, (Minor) y-radius, rotation, start, end
    c.ellipse(
      this.center.x - this.e,
      this.center.y,
      this.a,
      this.b,
      rotation,
      0,
      Math.PI * 2
    );
    c.stroke();
    c.closePath();
  }

  info() {
    let distanceText =
      toLy(this.r) > 0
        ? `\u2192 ${formatNumber(toLy(this.r))} ly `
        : `\u2192 ${formatNumber(this.r * 1e-3)} km `;
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

  copy(copy) {
    // return Object.create(copy);
    if (copy instanceof BlackHole)
      return new BlackHole(
        copy.name,
        copy.center,
        copy.radius,
        copy.distance,
        copy.velocity,
        copy.eccentricity,
        copy.mass,
        copy.color,
        copy.type,
        copy.colBH
      );
    console.log(createInstance('Planet'));
    return new CelestialBody(
      copy.name,
      copy.center,
      copy.R,
      copy.rp,
      copy.ra,
      copy.mass,
      copy.color,
      copy.type
    );
  }
}
