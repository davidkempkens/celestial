// Instantiating all Celestial Objects

// Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color - Type
const sun = new CelestialBody("Sun", center, .696342, 0, 0, 0, 1.9855e30, "#F2A516", "Star");

// Planets
const mercury = new CelestialBody("Mercury", sun, .00243964, 57.909175, 47.8725, 0.20563069, 3.302e23, "#BFB6AE", 'Planet');
const venus = new CelestialBody("Venus", sun, .00605159, 108.208930, 35.0214, 0.00677323, 4.869e24, "#F2C879", 'Planet');
const earth = new CelestialBody("Earth", sun, .0063781, 149.597890, 29.7859, 0.01671022, 5.972e24, "#03588C", 'Planet');
const mars = new CelestialBody("Mars", sun, .00339700, 227.936640, 24.1309, 0.09341233, 6.4191e23, "#F24E29", 'Planet');
const jupiter = new CelestialBody("Jupiter", sun, .07149268, 778.412010, 13.0697, 0.04839266, 1.8987e27, "#D96C0D", 'Planet');
const saturn = new CelestialBody("Saturn", sun, .06026714, 1426.725400, 9.6726, 0.05415060, 5.6851e26, "#D9CAAD", 'Planet');
const uranus = new CelestialBody("Uranus", sun, .02555725, 2870.972200, 6.8352, 0.04716771, 8.6849e25, "#BBE2F2", 'Planet');
const neptune = new CelestialBody("Neptune", sun, .02476636, 4498.252900, 5.4778, 0.00858587, 1.0244e26, "#5368A6", 'Planet');

// Dwarfs and Minor Planets
const pluto = new CelestialBody("Pluto", sun, .001190, 5906.3800000, 4.7490, 0.24880766, 1.305e22, "#626973", 'Dwarf');
const ceres = new CelestialBody("Ceres", sun, .000473, 413.700000, 17.882, 0.080, 9.39e20, "#626973", 'Dwarf');
const haumea = new CelestialBody("Haumea", sun, .000816, 6484.000000, 4.484, .18874, 4.01e21, "#626973", 'Dwarf');
const makemake = new CelestialBody("Makemake", sun, .000715, 6850.000000, 4.4, .159, 4.4e21, "#626973", 'Dwarf');
const eris = new CelestialBody("Eris", sun, .001163, 10210.000000, 3.436, .44177, 1.7e22, "#F24E29", 'Dwarf');
const eros = new CelestialBody('Eros', sun, .00000842, 1.4579 * AU, 24.36, .223, 7.2e15, '#626973', 'Dwarf');

// Moons
// Earth Moon
const moon = new CelestialBody("Moon", earth, .0017371, .384399, 1.022, 0.0549, 7.3477e22, "#F2F2F2", "Moon");
// Mars Moons
const phobos = new CelestialBody("Phobos", mars, .0000111, .009270, 2.138, 0.0151, 1.08e16, "#D9D9D9", "Moon");
const deimos = new CelestialBody("Deimos", mars, .0000062, .023460, 1.3513, 0.00033, 2e15, "#D9D9D9", "Moon");
// Jupiter Moons
const io = new CelestialBody("Io", jupiter, .001815, .421600, 17.34, 0.00410, 8.94e22, "#F2CF63", "Moon");
const europa = new CelestialBody("Europa", jupiter, .001569, .670900, 13.74, 0.009, 4.8e22, "#049DBF", "Moon");
const ganymede = new CelestialBody("Ganymede", jupiter, .0026341, 1.070400, 10.880, 0.0013, 14.819e22, "#F2F0D8", "Moon");
const callisto = new CelestialBody("Callisto", jupiter, .0024103, 1.882700, 8.204, 0.0074, 10.758e22, "#8C7E6D", "Moon");
// Saturn Moons
const mimas = new CelestialBody("Mimas", saturn, .0001983, .185520, 14.32, 0.0202, 0.00375e22, "#F2F0D8", "Moon");
const enceladus = new CelestialBody("Enceladus", saturn, .0002521, .238020, 12.63, 0.0047, 0.0108e22, "#F2F0D8", "Moon");
const tethys = new CelestialBody("Tethys", saturn, .000533, .294619, 11.35, 0.02, .06174e22, "#F2F0D8", "Moon");
const dione = new CelestialBody("Dione", saturn, .0005617, .377396, 10.03, 0.002, .1095e22, "#F2F0D8", "Moon");
const rhea = new CelestialBody("Rhea", saturn, .0007643, .527108, 8.48, 0.001, .2306e22, "#F2F0D8", "Moon");
const titan = new CelestialBody("Titan", saturn, .002576, 1.221870, 5.57, 0.0288, 13.452e22, "#F2CF63", "Moon");
const hyperion = new CelestialBody("Hyperion", saturn, .0001386, 1.841000, 5.00, 0.123006, 5.6199e18, "#F2F0D8", "Moon");
const iapetus = new CelestialBody("Iapetus", saturn, .0007356, 3.560820, 3.265, 0.0286, .18053e22, "#F2F0D8", "Moon");
// Uranus Moons
const miranda = new CelestialBody("Miranda", uranus, .0002358, .129390, 6.657, 0.0013, .00659e22, "#F2F0D8", "Moon");
const ariel = new CelestialBody("Ariel", uranus, .0005789, .190900, 5.50898, 0.0012, .135e22, "#F2F0D8", "Moon");
const umbriel = new CelestialBody("Umbriel", uranus, .0005847, .265970, 4.66797, 0.005, .12e22, "#F2F0D8", "Moon");
const titania = new CelestialBody("Titania", uranus, .0007889, .435840, 3.644, 0.0011, .35e22, "#F2F0D8", "Moon");
const oberon = new CelestialBody("Oberon", uranus, .0007614, .583519, 3.152, 0.0014, .3014e22, "#F2F0D8", "Moon");
// Neptune Moon
const triton = new CelestialBody("Triton", neptune, .0013534, .354759, 4.39, 0.00002, 2.14e22, "#F2C879", "Moon");
// Pluto Moon
const charon = new CelestialBody("Charon", pluto, .0006035, .017536, 0.2, 0.0022, .152e22, "#F2C879", "Moon");
//-----------------------------------------------------//
//-----------------------------------------------------//
//-----------------------------------------------------//
// OBSERVABLE UNIVERSE SCALE Radius 46,5 billion lightyears / 93 billion lighty-years Durchmesser
const universe = new CelestialBody('Observable Universe', center, 46500000000 * ly, 46500000000 * ly, 0, 0, 0, 'white', 'Universe');

// BLACK HOLE
const m87 = new CelestialBody('Messier87', center, 2600000000 * AU, 5000000000 * AU, 0, 0, 10000 * solarMass, 'white', 'Black Hole');

// Suns
const barnard = new CelestialBody('Barnard\'s Star', center, solarRadius * .2, 150 * AU, 0, 0, solarMass * .144, '#D9042B', 'Star');
const siriusA = new CelestialBody('Sirius A', center, 1.711 * solarRadius, 160 * AU, 0, 0, 2.063 * solarMass, '#52CBD9', 'Star');
const betaCentauri = new CelestialBody('Beta Centauri', center, 9 * solarRadius, 170 * AU, 0, 0, 12.02 * solarMass, '#3037BF', 'Star');
const r136a1 = new CelestialBody('R136a1', center, 39.2 * solarRadius, 210 * AU, 0, 0, 215 * solarMass, '#79DCF2', 'Star');
const gacrux = new CelestialBody('Gacrux', center, 120 * solarRadius, 230 * AU, 0, 0, 1.5 * solarMass, '#D91438', 'Star');
const pistolStar = new CelestialBody('Pistol Star', center, 420 * solarRadius, 250 * AU, 0, 0, 27.5 * solarMass, '#0597F2', 'Star');
const rhoCassiopeiae = new CelestialBody('Rho Cassiopeiae', center, 981 * solarRadius, 300 * AU, 0, 0, 40 * solarMass, '#F5EFC8', 'Star');
const stephenson218 = new CelestialBody('Stephenson 2-18', center, 2150 * solarRadius, 400 * AU, 0, 0, 1000 * solarMass, '#F21905', 'Star');

// Alpha Centauri
const alphaCentauriA = new CelestialBody('Alpha Centauri A', center, 1.2234 * solarRadius, 4.37 * ly, 0, 0, 1.1 * solarMass, '#F2B05E', 'Star');
const alphaCentauriB = new CelestialBody('Alpha Centauri B', alphaCentauriA, .8632 * solarRadius, 7, 0, .124, 35.6 * AU, '#D98F4E', 'Star');

// ARRAYS
// Planets Array
const planets = [
    earth,
    mars,
    venus,
    mercury,
    jupiter,
    saturn,
    uranus,
    neptune,
];

// Dwarfs Array
const dwarfs = [
    pluto,
    ceres,
    haumea,
    makemake,
    eris,
    eros
]

// Moons Array
const moons = [
    moon,
    deimos,
    phobos,
    io,
    europa,
    ganymede,
    callisto,
    mimas,
    enceladus,
    tethys,
    dione,
    rhea,
    titan,
    hyperion,
    iapetus,
    miranda,
    ariel,
    umbriel,
    titania,
    oberon,
    triton,
    charon
];

// STARS ARRAY
const stars = starsFactory(500);

// ASTEROIDS ARRAY
const kuiperBelt = asteroidFactory(800, 'Kuiper Asteroid', sun, .0001, .0006, 30 * AU, 20 * AU, 17, 25, .1, 10e10, '#5E574F', 'Asteroid');
const mainBelt = asteroidFactory(200, 'Main Asteroid', sun, .0001, .0006, 600, 150, 17, 25, .2, 10e10, '#5E574F', 'Asteroid');

// SUN ARRAY
const suns = [barnard, siriusA, betaCentauri, r136a1, gacrux, pistolStar, rhoCassiopeiae, stephenson218];

// Align on the right side to compare sizes
suns.forEach(s => s.w = 0);
m87.w = 0

// ALPHA CENTAURI ARRAY
const alphaCentauri = [alphaCentauriA, alphaCentauriB];
alphaCentauri.forEach(a => a.w = 0);

// BIG BODIES ARRAY WITHOUT ASTEROIDS
const bigBodies = [sun, m87, universe];
suns.forEach(s => bigBodies.push(s));
planets.forEach(p => bigBodies.push(p));
dwarfs.forEach(d => bigBodies.push(d));
moons.forEach(m => bigBodies.push(m));
alphaCentauri.forEach(a => bigBodies.push(a));

// ASTEROIDS ARRAY
const asteroids = [];
mainBelt.forEach(a => asteroids.push(a));
kuiperBelt.forEach(k => asteroids.push(k));

// EVERYTHING ARRAY FOR EASY HANDLING
var everything = [sun, m87, universe];
bigBodies.forEach(p => everything.push(p));
asteroids.forEach(d => everything.push(d));