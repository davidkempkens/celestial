// STARS ARRAY
const stars = starsFactory(300);

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
const exoplanets = [];
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
const everything = [Center];
let bodies = []

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
                            // bodies.push(newBody)
                        } else {
                            suns.push(newBody);
                        }
                        bodies.push(newBody)
                        break;
                    case 'Planet':
                    case 'Exoplanet':
                        newBody = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type, d.symbol, d.phi);
                        if (d.name == 'Earth') earth = newBody;
                        if (centerObject == sun) {
                            planets.push(newBody);
                            solarSystem.push(newBody);
                            bodies.push(newBody)
                        } else exoplanets.push(newBody);
                        break;
                    case 'Dwarf':
                        newBody = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type, d.symbol, d.phi);
                        dwarfs.push(newBody);
                        solarSystem.push(newBody);
                        bodies.push(newBody)
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
                        bodies.push(newBody)
                        break;
                    case 'God':
                        newBody = new BlackHole(d.name, centerObject, d.radius, d.distance, d.velocity, d.mass, d.color, d.type, d.colors, d.symbol, d.phi);
                        god = newBody;
                        god.phi = -Math.PI / 180 * 90;
                        break;
                    case 'Galaxy':
                        newBody = new Galaxy(d.name, centerObject, d.radius, d.distance, d.velocity, d.mass, d.color, d.type, d.count, d.symbol, d.phi);
                        galaxies.push(newBody);
                        if (newBody.name == 'Observable Universe') universe = newBody
                        break;
                    default:
                        break;
                };
                everything.push(newBody);
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
            voyager1 = new Probe('Yoyager 1', Center, 3e6, 158.79 * AE, 17000, 825.5, 'white', 'Probe', '', deg(20));

            // Satellites
            iss = new Satellite('ISS', earth, 100, earth.R + 413000, earth.R + 422000, 444.615, 'white', 'Satellite');
            geostationary = new Satellite('GOES-16', earth, 50, earth.R + 35780.2e3, earth.R + 35793.1e3, 2857, 'grey', 'Satellite');
            satellites.push(iss, geostationary);

            bigBodies = [sun, ...planets, ...dwarfs, ...moons, ...satellites, lightRay, ...suns, ...blackHoles, ...satellites, voyager1, ...exoplanets];
            everything.push(iss, geostationary, lightRay, voyager1);
        });
}