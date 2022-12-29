/** 
* Create a an fixed amount of asteroids around a center body
* @param {Number} count The number of Asteroids, that will be generated.
* @param {String} name Name
* @param {String} center The name of the center body.
* @param {Number} minRadius The min. radius of each asteroid in meters (m).
* @param {Number} maxRadius The max. radius of each asteroid in meters (m).
* @param {Number} minDistance The min. distance to the other body in meters (m).
* @param {Number} maxDistance The max. distance to the other body in meters (m).
* @param {Number} mass The mass of each asteroid in kilogramm (kg).
* @param {String} color Color as String, e.g.: '#0F2D23', 'white', 'rgb(0,255,0)'
* @param {String} type Type of the body, e.g. Planet, Dwarf, Asteroid
* @returns {Array<Asteroid>} belt Returns an array of Asteroid Objects.
*/
function asteroidFactory(count, name, center, minRadius, maxRadius, minDistance, maxDistance, mass, color, type) {
    let belt = [];
    for (let i = 0; i < count; i++) {
        let n = i + ". " + name;
        let r = (minRadius + (Math.random() * (maxRadius - minRadius))) * 8e2;
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