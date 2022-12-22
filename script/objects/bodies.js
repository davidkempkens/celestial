// Instantiating all Celestial Objects

// STARS ARRAY
const stars = starsFactory(300);

// Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color - Type
const sun = new Sun("Sun", Center, .696342, 0, 0, 0, 1.9855e30, "#F2A516", "Star");

// Planets
const mercury = new Planet("Mercury", sun, .00243964, 57.909175, 47.8725, 0.20563069, 3.302e23, "#BFB6AE", 'Planet');
const venus = new Planet("Venus", sun, .00605159, 108.208930, 35.0214, 0.00677323, 4.869e24, "#F2C879", 'Planet');
const earth = new Planet("Earth", sun, .0063781, 149.597890, 29.7859, 0.01671022, 5.972e24, "#03588C", 'Planet');
const mars = new Planet("Mars", sun, .00339700, 227.936640, 24.1309, 0.09341233, 6.4191e23, "#F24E29", 'Planet');
const jupiter = new Planet("Jupiter", sun, .07149268, 778.412010, 13.0697, 0.04839266, 1.8987e27, "#D96C0D", 'Planet');
const saturn = new Planet("Saturn", sun, .06026714, 1426.725400, 9.6726, 0.05415060, 5.6851e26, "#D9CAAD", 'Planet');
const uranus = new Planet("Uranus", sun, .02555725, 2870.972200, 6.8352, 0.04716771, 8.6849e25, "#BBE2F2", 'Planet');
const neptune = new Planet("Neptune", sun, .02476636, 4498.252900, 5.4778, 0.00858587, 1.0244e26, "#5368A6", 'Planet');

// Dwarfs and Minor Planets
const ceres = new Planet("Ceres", sun, .000473, 413.700000, 17.882, 0.080, 9.39e20, "#626973", 'Dwarf');
const pluto = new Planet("Pluto", sun, .001190, 5906.3800000, 4.7490, 0.24880766, 1.305e22, "#626973", 'Dwarf');
const haumea = new Planet("Haumea", sun, .000816, 6484.000000, 4.484, .18874, 4.01e21, "#626973", 'Dwarf');
const makemake = new Planet("Makemake", sun, .000715, 6850.000000, 4.4, .159, 4.4e21, "#626973", 'Dwarf');
const eris = new Planet("Eris", sun, .001163, 10210.000000, 3.436, .44177, 1.7e22, "#F24E29", 'Dwarf');
const eros = new Planet('Eros', sun, .00000842, 1.4579 * AE, 24.36, .223, 7.2e15, '#626973', 'Dwarf');

// Moons
// Earth Moon
const moon = new Moon("Moon", earth, .0017371, .384399, 1.022, 0.0549, 7.3477e22, "#F2F2F2", "Moon");
// Mars Moons
const phobos = new Moon("Phobos", mars, .0000111, .009270, 2.138, 0.0151, 1.08e16, "#D9D9D9", "Moon");
const deimos = new Moon("Deimos", mars, .0000062, .023460, 1.3513, 0.00033, 2e15, "#D9D9D9", "Moon");
// Jupiter Moons
const io = new Moon("Io", jupiter, .001815, .421600, 17.34, 0.00410, 8.94e22, "#F2CF63", "Moon");
const europa = new Moon("Europa", jupiter, .001569, .670900, 13.74, 0.009, 4.8e22, "#049DBF", "Moon");
const ganymede = new Moon("Ganymede", jupiter, .0026341, 1.070400, 10.880, 0.0013, 14.819e22, "#F2F0D8", "Moon");
const callisto = new Moon("Callisto", jupiter, .0024103, 1.882700, 8.204, 0.0074, 10.758e22, "#8C7E6D", "Moon");
// Saturn Moons
const mimas = new Moon("Mimas", saturn, .0001983, .185520, 14.32, 0.0202, 0.00375e22, "#F2F0D8", "Moon");
const enceladus = new Moon("Enceladus", saturn, .0002521, .238020, 12.63, 0.0047, 0.0108e22, "#F2F0D8", "Moon");
const tethys = new Moon("Tethys", saturn, .000533, .294619, 11.35, 0.02, .06174e22, "#F2F0D8", "Moon");
const dione = new Moon("Dione", saturn, .0005617, .377396, 10.03, 0.002, .1095e22, "#F2F0D8", "Moon");
const rhea = new Moon("Rhea", saturn, .0007643, .527108, 8.48, 0.001, .2306e22, "#F2F0D8", "Moon");
const titan = new Moon("Titan", saturn, .002576, 1.221870, 5.57, 0.0288, 13.452e22, "#F2CF63", "Moon");
const hyperion = new Moon("Hyperion", saturn, .0001386, 1.841000, 5.00, 0.123006, 5.6199e18, "#F2F0D8", "Moon");
const iapetus = new Moon("Iapetus", saturn, .0007356, 3.560820, 3.265, 0.0286, .18053e22, "#F2F0D8", "Moon");
// Uranus Moons
const miranda = new Moon("Miranda", uranus, .0002358, .129390, 6.657, 0.0013, .00659e22, "#F2F0D8", "Moon");
const ariel = new Moon("Ariel", uranus, .0005789, .190900, 5.50898, 0.0012, .135e22, "#F2F0D8", "Moon");
const umbriel = new Moon("Umbriel", uranus, .0005847, .265970, 4.66797, 0.005, .12e22, "#F2F0D8", "Moon");
const titania = new Moon("Titania", uranus, .0007889, .435840, 3.644, 0.0011, .35e22, "#F2F0D8", "Moon");
const oberon = new Moon("Oberon", uranus, .0007614, .583519, 3.152, 0.0014, .3014e22, "#F2F0D8", "Moon");
// Neptune Moon
const triton = new Moon("Triton", neptune, .0013534, .354759, 4.39, 0.00002, 2.14e22, "#F2C879", "Moon");
// Pluto Moon
const charon = new Moon("Charon", pluto, .0006035, .017536, 0.2, 0.0022, .152e22, "#F2C879", "Moon");

// Asteroid Belts - Sizes not to scale
const mainBelt = asteroidFactory(200, 'Main Asteroid', sun, .001, .002, 600, 750, 17, 25, 0, .2, 10e10, '#5E574F', 'Asteroid');
const kuiperBelt = asteroidFactory(1000, 'Kuiper Asteroid', sun, .001, .002, 30 * AE, 20 * AE, 17, 25, 0, .1, 10e10, '#5E574F', 'Asteroid');
const oortCloud = asteroidFactory(1000, 'Oort Cloud Asteroid', sun, .6, 1, 2000 * AE, 5000 * AE, -17, -25, 0, .1, 1e25, '#5E574F', 'Asteroid');

// Space Probes
const voyager1 = new Probe('Yoyager 1', Center, .003, 152.2 * AE, 17, 0, 825.5, 'white', 'Probe');

// Planets Array
// const planets = [
//     mercury,
//     venus,
//     earth,
//     mars,
//     jupiter,
//     saturn,
//     uranus,
//     neptune,
// ];

// Dwarfs Array
// const dwarfs = [
//     pluto,
//     ceres,
//     haumea,
//     makemake,
//     eris,
//     eros
// ]

// // Moons Array
// const moons = [
//     moon,
//     deimos,
//     phobos,
//     io,
//     europa,
//     ganymede,
//     callisto,
//     mimas,
//     enceladus,
//     tethys,
//     dione,
//     rhea,
//     titan,
//     hyperion,
//     iapetus,
//     miranda,
//     ariel,
//     umbriel,
//     titania,
//     oberon,
//     triton,
//     charon
// ];

// OBSERVABLE UNIVERSE SCALE Radius 46,5 billion light-years / 93 billion light-years
const universe = new Galaxy('Observable Universe', Center, 46.5e9 * LY, 0, 0, 0, 1.5e53, 'white', 'Universe');

// BLACK HOLES
const sagittariusA = new BlackHole('Sagittarius A*', Center, 17 * SOLAR_RADIUS, -26673 * LY, 0, 0, 4e6 * SOLAR_MASS, '#3097BF', 'Black Hole', ["#59D9D9", "#4ECBD9", "#3097BF", "#024959", "#000000"]);
const bLLacertae = new BlackHole('BL Lacertae*', Center, 115 * SOLAR_RADIUS, -9e8 * LY, 0, 0, 1, 'white', 'Black Hole', ["#F2E7DC", "#A9D9D0", "#038C7F", '#027373', "#000"])
const cygnusA = new BlackHole('Cygnus A', Center, 14700, -760e6 * LY, 0, 0, 2.5e9 * SOLAR_MASS, 'white', 'Black Hole', ["#F24405", "#D90452", "#8C035C", "#090126", "#000000"])
const m87 = new BlackHole('M87*', Center, 19000, -53.49e6 * LY, 0, 0, 7.22e9 * SOLAR_MASS, 'white', 'Black Hole', ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"]);
const ton618 = new BlackHole('TON 618', Center, 1.949e5, 10.37e9 * LY, 0, 0, 66e9 * SOLAR_MASS, 'white', 'Black Hole', ["#F2B705", "#F29F05", "#BF3604", "#591E08", "#000000"]);

// GALAXIES
const milkyWay = new Galaxy('Milky Way', sagittariusA, 185e3 * LY, 0, 0, 0, 1e12 * SOLAR_MASS, 'white', 'Galaxy');

// SPEED OF LIGHT
const lightRay = new Photon('C', sun, earth.R, 0, C, 0, 0, 'CYAN', 'Photon');

// Suns
const barnard = new Sun('Barnard\'s Star', Center, SOLAR_RADIUS * .2, 5.958 * LY, 0, 0, SOLAR_MASS * .144, '#D9042B', 'Star');
const siriusA = new Sun('Sirius A', Center, 1.711 * SOLAR_RADIUS, 8.611 * LY, 0, 0, 2.063 * SOLAR_MASS, '#52CBD9', 'Star');
const betaCentauri = new Sun('Beta Centauri', Center, 9 * SOLAR_RADIUS, 391.4 * LY, 0, 0, 12.02 * SOLAR_MASS, '#3037BF', 'Star');
const r136a1 = new Sun('R136a1', Center, 39.2 * SOLAR_RADIUS, 163000 * LY, 0, 0, 215 * SOLAR_MASS, '#79DCF2', 'Star');
const gacrux = new Sun('Gacrux', Center, 120 * SOLAR_RADIUS, 88.71 * LY, 0, 0, 1.5 * SOLAR_MASS, '#D91438', 'Star');
const pistolStar = new Sun('Pistol Star', Center, 420 * SOLAR_RADIUS, 26.090 * LY, 0, 0, 27.5 * SOLAR_MASS, '#0597F2', 'Star');
const rhoCassiopeiae = new Sun('Rho Cassiopeiae', Center, 981 * SOLAR_RADIUS, 3400 * LY, 0, 0, 40 * SOLAR_MASS, '#F5EFC8', 'Star');
const stephenson218 = new Sun('Stephenson 2-18', Center, 2150 * SOLAR_RADIUS, 19570 * LY, 0, 0, 1000 * SOLAR_MASS, '#F21905', 'Star');

// Alpha Centauri
const alphaCentauriA = new Sun('Alpha Centauri A', Center, 1.2234 * SOLAR_RADIUS, 4.37 * LY, 0, 0, 1.1 * SOLAR_MASS, '#F2B05E', 'Star');
const alphaCentauriB = new Sun('Alpha Centauri B', alphaCentauriA, .8632 * SOLAR_RADIUS, 7, 0, .124, 35.6 * AE, '#D98F4E', 'Star');

// SUN ARRAY
const suns = [barnard, siriusA, betaCentauri, r136a1, gacrux, pistolStar, rhoCassiopeiae, stephenson218];
// ALPHA CENTAURI ARRAY
const alphaCentauri = [alphaCentauriA, alphaCentauriB];

const solarSystem = [];
const planets = [];
const dwarfs = []
const moons = [];
loadSolarSystemData()

// const solarSystem = [sun, ...planets, ...dwarfs]
// Black Holes
const blackHoles = [sagittariusA, bLLacertae, cygnusA, m87, ton618]
// Galaxies
const galaxies = [milkyWay]
// BIG BODIES ARRAY WITHOUT ASTEROIDS
const bigBodies = [sun, ...moons, ...planets, ...dwarfs, ...blackHoles, ...galaxies, universe, voyager1, lightRay, ...suns, ...alphaCentauri];
// ASTEROIDS ARRAYS
const asteroids = [...mainBelt, ...kuiperBelt, ...oortCloud];

// EVERYTHING ARRAY FOR EASY HANDLING
const everything = [...bigBodies, ...asteroids];

// RELATIONSHIP OF BODIES TO ITS SATELLITES
everything.forEach(p => {
    everything.forEach(m => {
        if (m.center === p) {
            p.satelites.push(m);
        }
    });
});


// Read celestial bodies from json file
async function loadSolarSystemData() {
    await fetch('file.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {

                let centerObject = solarSystem.find(c => c.name == d.center)

                if (d.type == 'Star') {
                    solarSystem.push(new Sun(d.name, Center, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type))
                } else if (d.type == 'Planet') {
                    let p = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type)
                    planets.push(p)
                    solarSystem.push(p)
                } else if (d.type == 'Dwarf') {
                    let p = new Planet(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type)
                    dwarfs.push(p)
                    solarSystem.push(p)
                } else if (d.type == 'Moon') {
                    let p = new Moon(d.name, centerObject, d.radius, d.periapsis, d.apoapsis, d.mass, d.color, d.type)
                    moons.push(p)
                    solarSystem.push(p)

                }
            })
            updateHUD([sun, ...planets, ...dwarfs], hudPlanets);
            updateHUD([...alphaCentauri, ...suns], hudSuns);
            updateHUD([...blackHoles, lightRay, voyager1, universe], hudOther);
        })
}





