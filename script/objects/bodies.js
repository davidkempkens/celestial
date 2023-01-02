// Instantiating all Celestial Objects

// STARS ARRAY
const stars = starsFactory(300);

// Read celestial bodies from json file
async function loadSolarSystemData() {

    await fetch('file.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {

                let centerObject = everything.find(c => c.name === d.center);
                let newBody;

                switch (d.type) {
                    case 'Star':
                        newBody = new Sun(d.name, centerObject, d.radius, d.distance, d.velocity, d.mass, d.color, d.type, d.symbol, d.phi);
                        if (d.name == 'Sun') {
                            solarSystem.push(newBody);
                            sun = newBody;
                        } else {
                            suns.push(newBody);
                        }
                        break;
                    case 'Planet':
                        newBody = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type, d.symbol, d.phi);
                        if (d.name == 'Earth') earth = newBody;
                        planets.push(newBody);
                        solarSystem.push(newBody);
                        break;
                    case 'Dwarf':
                        newBody = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type, d.symbol, d.phi);
                        dwarfs.push(newBody);
                        solarSystem.push(newBody);
                        break;
                    case 'Moon':
                        newBody = new Moon(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type, d.symbol, d.phi);
                        if (d.name == 'Moon') moon = newBody;
                        moons.push(newBody);
                        solarSystem.push(newBody);
                        break;
                    case 'Black Hole':
                        newBody = new BlackHole(d.name, centerObject, d.radius, d.distance, d.velocity, d.mass, d.color, d.type, d.colors, d.symbol, d.phi);
                        if (newBody.name == 'Sagittarius A*') sagittariusA = newBody;
                        blackHoles.push(newBody);
                        break;
                    case 'God':
                        newBody = new BlackHole(d.name, centerObject, d.radius, d.distance, d.velocity, d.mass, d.color, d.type, d.colors, d.symbol, d.phi);
                        god = newBody;
                        god.phi = -Math.PI / 180 * 90;
                        break;
                    case 'Galaxy':
                        newBody = new Galaxy(d.name, centerObject, d.radius, d.distance, d.velocity, d.mass, d.color, d.type, d.symbol, d.phi);
                        galaxies.push(newBody);
                        if (newBody.name == 'Observable Universe') universe = newBody
                        break;
                    default:
                        break;
                };

                everything.push(newBody)
            });

            // Asteroids
            asteroidFactory(200, 'Main Asteroid', sun, 1e6, 2e6, 2 * AE, 3.4 * AE, 10e10, '#5E574F', 'Asteroid')
                .forEach(a => {
                    mainBelt.push(a);
                    everything.push(a);
                });
            asteroidFactory(1000, 'Kuiper Asteroid', sun, 1e6, 2e6, 30 * AE, 20 * AE, 10e10, '#5E574F', 'Asteroid')
                .forEach(a => {
                    kuiperBelt.push(a);
                    everything.push(a);
                });
            asteroidFactory(1000, 'Oort Cloud Asteroid', sun, 1e8, 1e9, 2000 * AE, 5000 * AE, 1e25, '#5E574F', 'Asteroid')
                .forEach(a => {
                    oortCloud.push(a);
                    everything.push(a);
                });

            asteroids = [...mainBelt, ...kuiperBelt, ...oortCloud];

            // Photon
            lightRay = new Photon('C', sun, 1e7, sun.R, C, 0, 'white', 'Photon', '', 0);

            // Space Probes
            voyager1 = new Probe('Yoyager 1', Center, 3e6, 158.79 * AE, 17000, 825.5, 'white', 'Probe', '', 350);

            // Satellites
            iss = new Satellite('ISS', earth, 100, earth.R + 413000, earth.R + 422000, 444.615, 'white', 'Satellite');
            geostationary = new Satellite('GOES-16', earth, 50, earth.R + 35780.2e3, earth.R + 35793.1e3, 2857, 'grey', 'Satellite');
            satellites.push(iss, geostationary);

            bigBodies = [sun, ...planets, ...dwarfs, ...moons, ...satellites, lightRay, ...suns, ...blackHoles, ...satellites, voyager1];
            everything.push(iss, geostationary, lightRay, voyager1);

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
const everything = [Center];

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