// INITIALIZES ASTEROIDS AS CELESTIAL BODY OBJECTS AND RETURNS ARRAY OF ASTEROIDS
// count - name - center - min. radius(Mio km) - max. radius(Mio km)- min. distance(Mio km) - max. distance(Mio km)
// - min. velocity(km/s) - max. velocity(km/s) - eccentricity - mass - color - type
function asteroidFactory(count, name, center, minRadius, maxRadius, minDistance, maxDistance, minVelocity, maxVelocity, minEccentricity, maxEccentricity, mass, color, type) {
    let belt = [];
    for (let i = 0; i < count; i++) {
        let n = i + ". " + name;
        let r = (minRadius + (Math.random() * (maxRadius - minRadius))) * 500;
        let d = minDistance + (Math.random() * (maxDistance - minDistance));
        let v = minVelocity + (Math.random() * (maxVelocity - minVelocity));
        let e = minEccentricity + (Math.random() * (maxEccentricity - minEccentricity));
        // Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color - Type
        belt.push(new Asteroid(n, center, r, d, v, e, mass, color, type));
    }
    return belt;
}

// INITIALIZES STARS AS STAR OBJECTS AND RETURNS ARRAY OF STARS - Pass amount as argument
function starsFactory(amount) {
    let stars = [];
    for (let i = 0; i < amount; i++) {
        stars.push(new Star(canvas.width, canvas.height));
    }
    return stars;
}