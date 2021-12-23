const checkCoords = (coords) => coords[0] >= -50 && coords[1] <= 50

const initCubesOn = (input) => {
    const cubesState = {}
    input.forEach(({ action, xCoords, yCoords, zCoords }) => {
        if (checkCoords(xCoords) && checkCoords(yCoords) && checkCoords(zCoords)) {
            for (let x = xCoords[0]; x <= xCoords[1]; x++) {
                for (let y = yCoords[0]; y <= yCoords[1]; y++) {
                    for (let z = zCoords[0]; z <= zCoords[1]; z++) {
                        cubesState[`${x}-${y}-${z}`] = (action === 'on') ? 1 : 0
                    }
                }
            }
        }
    })
    return Object.values(cubesState).reduce((acc, value) => acc + value, 0)
}
module.exports = { initCubesOn }
