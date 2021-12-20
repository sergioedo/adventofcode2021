const checkTrajectory = (incX, incY, minX, maxX, minY, maxY) => {
    let outOfArea = false
    let hitArea = false
    let maxHeight = -Infinity
    const position = [0, 0]
    while (!outOfArea && !hitArea) {
        // console.log(position)
        position[0] += incX
        position[1] += incY
        incX = incX > 0 ? incX - 1 : incX < 0 ? incX + 1 : 0
        incY -= 1
        maxHeight = Math.max(maxHeight, position[1])

        if (position[0] > maxX || position[1] < minY) outOfArea = true
        if (position[0] >= minX && position[0] <= maxX && position[1] >= minY && position[1] <= maxY) hitArea = true
    }
    return { hitArea, maxHeight, position }
}

const highestYTrajectory = (minX, maxX, minY, maxY) => {
    const hitResults = []
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const trajectories = getTrajectoriesToPoint(x, y)

            hitResults.push(...trajectories)
        }
    }
    // const distinctResults = hitResults.reduce((acc, hit) => {
    //     acc[hit[0] + '-' + hit[1]] = 1
    //     return acc
    // }, {})
    // console.log(distinctResults.length)
    const sortedResults = hitResults.sort((a, b) => b[1] - a[1])
    // console.log(sortedResults)
    const maxYTrajectory = sortedResults[0][1]
    let maxHeight = 0
    for (let i = 1; i <= maxYTrajectory; i++) {
        maxHeight += i
    }
    return maxHeight
}

const getTrajectoriesToPoint = (x, y) => {
    // find possible x-velocity to arrive to x
    const xVelocities = []
    for (let v = 0; v <= x; v++) {
        // console.log('v', v)
        let found = false
        let posX = 0
        let actualVelocity = v
        while (!found && actualVelocity > 0) {
            posX += actualVelocity
            if (posX === x) {
                found = true
                xVelocities.push(v)
            } else {
                actualVelocity -= 1
            }
        }
    }
    // console.log(xVelocities)

    return xVelocities.map(xv => {
        // find possible y-velocity to arrive to y
        const yVelocities = []
        for (let v = 0; v <= -y; v++) {
            // console.log('vy', v)
            let found = false
            let posY = 0
            let actualVelocity = v
            while (!found && posY >= y) {
                posY += actualVelocity
                if (posY === y) {
                    found = true
                    // console.log(v, posY, actualVelocity)
                    const { hitArea } = checkTrajectory(xv, v, x, x, y, y)
                    if (hitArea) yVelocities.push([xv, v])
                    // yVelocities.push(v)
                } else {
                    actualVelocity -= 1
                }
            }
        }
        // console.log(yVelocities)

        return yVelocities
    }).flat().filter(array => array.length > 0).filter(array => array !== undefined)
}

module.exports = { highestYTrajectory, getTrajectoriesToPoint }
