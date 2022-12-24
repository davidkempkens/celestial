// INITIALIZES ASTEROIDS AS CELESTIAL BODY OBJECTS AND RETURNS ARRAY OF ASTEROIDS
// count - name - center - min. radius(m) - max. radius(m)- min. distance(m) - max. distance(m)
// mass(kg) - color - type
function asteroidFactory(count, name, center, minRadius, maxRadius, minDistance, maxDistance, mass, color, type) {
    let belt = [];
    for (let i = 0; i < count; i++) {
        let n = i + ". " + name;
        let r = (minRadius + (Math.random() * (maxRadius - minRadius))) * 1e3;
        let d1 = minDistance + (Math.random() * (maxDistance - minDistance));
        let d2 = minDistance + (Math.random() * (maxDistance - minDistance));

        // Name - Center - Radius(m) - Periapsis(m) - Apoapsis(m) - Mass(kg) - Color - Type
        belt.push(new Asteroid(n, center, r, d1, d2, mass, color, type));
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