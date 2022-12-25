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
                    sun = new Sun(d.name, Center, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type)
                    solarSystem.push(sun)
                    bigBodies.push(sun);
                } else if (d.type == 'Planet') {
                    let p = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type)
                    planets.push(p)
                    solarSystem.push(p)
                    bigBodies.push(p);
                } else if (d.type == 'Dwarf') {
                    let p = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type)
                    dwarfs.push(p)
                    solarSystem.push(p)
                    bigBodies.push(p);
                } else if (d.type == 'Moon') {
                    let p = new Moon(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type)
                    moons.push(p)
                    solarSystem.push(p)
                    bigBodies.push(p);
                }
            });

            // count - name - center - min. radius(m) - max. radius(m)- min. distance(m) - max. distance(m)
            // mass(kg) - color - type
            asteroidFactory(200, 'Main Asteroid', sun, 1e6, 2e6, 2 * AE, 3.4 * AE, 10e10, '#5E574F', 'Asteroid')
                .forEach(a => mainBelt.push(a));
            asteroidFactory(1000, 'Kuiper Asteroid', sun, 1e6, 2e6, 30 * AE, 20 * AE, 10e10, '#5E574F', 'Asteroid')
                .forEach(a => kuiperBelt.push(a));
            asteroidFactory(1000, 'Oort Cloud Asteroid', sun, 1e8, 1e9, 2000 * AE, 5000 * AE, 1e25, '#5E574F', 'Asteroid')
                .forEach(a => oortCloud.push(a))
            asteroids = [...mainBelt, ...kuiperBelt, ...oortCloud];
            updateHUD([sun, ...planets, ...dwarfs], hudPlanets);
            // updateHUD([...alphaCentauri, ...suns], hudSuns);
            // updateHUD([...blackHoles, lightRay, voyager1, universe], hudOther);
        })
}


const solarSystem = [];
const planets = [];
const dwarfs = []
const moons = [];
const bigBodies = [];
const mainBelt = [];
const kuiperBelt = [];
const oortCloud = [];
let asteroids = [];

// Space Probes
// const voyager1 = new Probe('Yoyager 1', Center, .003, 152.2 * AE, 17, 0, 825.5, 'white', 'Probe');

// OBSERVABLE UNIVERSE SCALE Radius 46,5 billion light-years / 93 billion light-years
// const universe = new Galaxy('Observable Universe', Center, 46.5e9 * LY, 0, 0, 0, 1.5e53, 'white', 'Universe');

// BLACK HOLES
// const sagittariusA = new BlackHole('Sagittarius A*', Center, 17 * SOLAR_RADIUS, -26673 * LY, 0, 0, 4e6 * SOLAR_MASS, '#3097BF', 'Black Hole', ["#59D9D9", "#4ECBD9", "#3097BF", "#024959", "#000000"]);
// const bLLacertae = new BlackHole('BL Lacertae*', Center, 115 * SOLAR_RADIUS, -9e8 * LY, 0, 0, 1, 'white', 'Black Hole', ["#F2E7DC", "#A9D9D0", "#038C7F", '#027373', "#000"])
// const cygnusA = new BlackHole('Cygnus A', Center, 14700, -760e6 * LY, 0, 0, 2.5e9 * SOLAR_MASS, 'white', 'Black Hole', ["#F24405", "#D90452", "#8C035C", "#090126", "#000000"])
// const m87 = new BlackHole('M87*', Center, 19000, -53.49e6 * LY, 0, 0, 7.22e9 * SOLAR_MASS, 'white', 'Black Hole', ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"]);
// const ton618 = new BlackHole('TON 618', Center, 1.949e5, 10.37e9 * LY, 0, 0, 66e9 * SOLAR_MASS, 'white', 'Black Hole', ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"]);

// GALAXIES
// const milkyWay = new Galaxy('Milky Way', sagittariusA, 185e3 * LY, 0, 0, 0, 1e12 * SOLAR_MASS, 'white', 'Galaxy');

// SPEED OF LIGHT
// const lightRay = new Photon('C', sun, earth.R, 0, C, 0, 0, 'CYAN', 'Photon');

// Suns
// const barnard = new Sun('Barnard\'s Star', Center, SOLAR_RADIUS * .2, 5.958 * LY, 0, 0, SOLAR_MASS * .144, '#D9042B', 'Star');
// const siriusA = new Sun('Sirius A', Center, 1.711 * SOLAR_RADIUS, 8.611 * LY, 0, 0, 2.063 * SOLAR_MASS, '#52CBD9', 'Star');
// const betaCentauri = new Sun('Beta Centauri', Center, 9 * SOLAR_RADIUS, 391.4 * LY, 0, 0, 12.02 * SOLAR_MASS, '#3037BF', 'Star');
// const r136a1 = new Sun('R136a1', Center, 39.2 * SOLAR_RADIUS, 163000 * LY, 0, 0, 215 * SOLAR_MASS, '#79DCF2', 'Star');
// const gacrux = new Sun('Gacrux', Center, 120 * SOLAR_RADIUS, 88.71 * LY, 0, 0, 1.5 * SOLAR_MASS, '#D91438', 'Star');
// const pistolStar = new Sun('Pistol Star', Center, 420 * SOLAR_RADIUS, 26.090 * LY, 0, 0, 27.5 * SOLAR_MASS, '#0597F2', 'Star');
// const rhoCassiopeiae = new Sun('Rho Cassiopeiae', Center, 981 * SOLAR_RADIUS, 3400 * LY, 0, 0, 40 * SOLAR_MASS, '#F5EFC8', 'Star');
// const stephenson218 = new Sun('Stephenson 2-18', Center, 2150 * SOLAR_RADIUS, 19570 * LY, 0, 0, 1000 * SOLAR_MASS, '#F21905', 'Star');

// Alpha Centauri
// const alphaCentauriA = new Sun('Alpha Centauri A', Center, 1.2234 * SOLAR_RADIUS, 4.37 * LY, 0, 0, 1.1 * SOLAR_MASS, '#F2B05E', 'Star');
// const alphaCentauriB = new Sun('Alpha Centauri B', alphaCentauriA, .8632 * SOLAR_RADIUS, 7, 0, .124, 35.6 * AE, '#D98F4E', 'Star');

// SUN ARRAY
// const suns = [barnard, siriusA, betaCentauri, r136a1, gacrux, pistolStar, rhoCassiopeiae, stephenson218];
// ALPHA CENTAURI ARRAY
// const alphaCentauri = [alphaCentauriA, alphaCentauriB];



// const solarSystem = [sun, ...planets, ...dwarfs]
// Black Holes
// const blackHoles = [sagittariusA, bLLacertae, cygnusA, m87, ton618]
// Galaxies
// const galaxies = [milkyWay]
// BIG BODIES ARRAY WITHOUT ASTEROIDS
// const bigBodies = [sun, ...moons, ...planets, ...dwarfs, ...blackHoles, ...galaxies, universe, voyager1, lightRay, ...suns, ...alphaCentauri];


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