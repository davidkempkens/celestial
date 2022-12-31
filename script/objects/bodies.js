// Instantiating all Celestial Objects

// STARS ARRAY
const stars = starsFactory(300);

// Read celestial bodies from json file
async function loadSolarSystemData() {

    await fetch('file.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {

                let centerObject = solarSystem.find(c => c.name == d.center);

                if (d.type == 'Star') {
                    let s = new Sun(d.name, Center, d.radius, d.distance, d.velocity, d.mass, d.color, d.type)
                    if (d.name == 'Sun') {
                        solarSystem.push(s);
                        sun = s;
                    } else {
                        suns.push(s);
                    }
                    if (s.name == 'Alpha Centauri B') {
                        s.center = suns.find(ss => ss.name == 'Alpha Centauri A');
                        s.r = 35.8 * AE;
                    }
                } else if (d.type == 'Planet') {
                    let p = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type);
                    if (d.name == 'Earth') earth = p;
                    planets.push(p)
                    solarSystem.push(p)
                } else if (d.type == 'Dwarf') {
                    let p = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type);
                    dwarfs.push(p)
                    solarSystem.push(p)
                } else if (d.type == 'Moon') {
                    let p = new Moon(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type);
                    if (d.name == 'Moon') moon = p;
                    moons.push(p)
                    solarSystem.push(p)
                } else if (d.type == 'Black Hole') {
                    let bh = new BlackHole(d.name, Center, d.radius, d.distance, d.velocity, d.mass, d.color, d.type, d.colors);
                    if (bh.name == 'Sagittarius A*') sagittariusA = bh;
                    if (bh.name == 'God') {
                        god = bh;
                        god.phi = -Math.PI / 180 * 90;
                        god.type = 'God';
                        // galaxies.push(god);

                    } else blackHoles.push(bh);
                } else if (d.type == 'Galaxy') {
                    let gal = new Galaxy(d.name, Center, d.radius, d.distance, d.velocity, d.mass, d.color, d.type);
                    galaxies.push(gal);
                    if (gal.name == 'Milky Way') {
                        milkyWay = gal;
                        milkyWay.center = sagittariusA;
                    }
                    if (gal.name == 'Observable Universe') {
                        universe = gal;
                    }
                }
            });

            // Asteroids
            asteroidFactory(200, 'Main Asteroid', sun, 1e6, 2e6, 2 * AE, 3.4 * AE, 10e10, '#5E574F', 'Asteroid')
                .forEach(a => mainBelt.push(a));
            asteroidFactory(1000, 'Kuiper Asteroid', sun, 1e6, 2e6, 30 * AE, 20 * AE, 10e10, '#5E574F', 'Asteroid')
                .forEach(a => kuiperBelt.push(a));
            asteroidFactory(1000, 'Oort Cloud Asteroid', sun, 1e8, 1e9, 2000 * AE, 5000 * AE, 1e25, '#5E574F', 'Asteroid')
                .forEach(a => oortCloud.push(a))
            asteroids = [...mainBelt, ...kuiperBelt, ...oortCloud];

            // Photon
            lightRay = new Photon('C', sun, 1e7, sun.R, C, 0, 'white', 'Photon');


            // Space Probes
            voyager1 = new Probe('Yoyager 1', Center, 3e6, 158.79 * AE, 17000, 825.5, 'white', 'Probe');

            // Satellites
            iss = new Satellite('ISS', earth, 100, earth.R + 413000, earth.R + 422000, 444.615, 'white', 'Satellite');
            geostationary = new Satellite('GOES-16', earth, 50, earth.R + 35780.2e3, earth.R + 35793.1e3, 2857, 'grey', 'Satellite');
            satellites.push(iss, geostationary);

            bigBodies = [sun, ...planets, ...dwarfs, ...moons, voyager1, iss, lightRay, ...suns, ...blackHoles, ...satellites];

        })
}


const solarSystem = [];
let sun;
let earth;
let moon;
let sagittariusA;
const planets = [];
const dwarfs = []
const moons = [];
const satellites = [];
let bigBodies = [];
const mainBelt = [];
const kuiperBelt = [];
const oortCloud = [];
let asteroids = [];
let voyager1;
let iss;
let lightRay;
let m87;
const suns = [];
const blackHoles = [];
const galaxies = [];
let milkyWay;
let universe;
let god;

// EVERYTHING ARRAY FOR EASY HANDLING
// const everything = [...bigBodies, ...asteroids];

// RELATIONSHIP OF BODIES TO ITS SATELLITES
// everything.forEach(p => {
//     everything.forEach(m => {
//         if (m.center === p) {
//             p.satelites.push(m);
//         }
//     });
// });

async function loadCSVFile() {
    await fetch('file.csv')
        .then(res => res.text())
        .then(data => {
            console.log(csvToJSON(data))
        })
}

//var csv is the CSV file with headers
function csvToJSON(csv) {
    var lines = csv.split("\r\n");
    var result = [];
    var headers = lines[0].split(";");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(";");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result);
}


function createInstance(className, d) {
    const classes = {
        Planet: Planet,
        Dwarf: Planet
        // ...
    };

    const Class = classes[className];
    if (!Class) {
        throw new Error(`Class not found: ${className}`);
    }

    // let centerObject = solarSystem.find(c => c.name == d.center);
    cl = new Class(d.name, d.center, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type);
    console.log(cl)
    return cl
    // return new Class(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type);
}

// Create an instance of the MyClass class
// let instance = createInstance('Planet', { name: 'Test', center: '', radius: 1, periapsis: 1, apoapsis: 1, mass: 1, color: 'red', type: 'Planet' });

// console.log(instance)