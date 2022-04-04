function test_creating_body() {
    // Name - Center - Radius(Mio km) - Distance(Mio km) - Velocity(km/s) - Eccentricity - Mass - Color - Type
    let celestialBody = new CelestialBody("TestName", center, 1, 150, 1, 0, 1e20, '#efefef', 'Test');

    if (celestialBody.name === 'TestName') {
        console.log('Name is correct')
    } else {
        console.log(`Name is not correct Expected ${celestialBody.name} to be TestName`)
    }

    if (celestialBody.center === center) {
        console.log('Center is correct')
    } else {
        console.log(`Center is not correct`)
        console.log(`Expected`)
        console.log(celestialBody.center)
        console.log(` to be `)
        console.log(center)
    }


    if (celestialBody.r === 1) {
        console.log('r is correct')
    } else {
        console.log(`r is not correct`)
        console.log(`Expected`)
        console.log(celestialBody.r)
        console.log(` to be `)
        console.log(1)
    }
}

function testAllBodies(){
    bigBodies.forEach(b => console.log(b.name, b))
}
testAllBodies()