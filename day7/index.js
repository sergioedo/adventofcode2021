const getFuelConstantCost = (position1, position2) => Math.abs(position1 - position2)

const cheapestCrabsAlignment = (positions, getFuelCost = getFuelConstantCost) => {
    const sortedPositions = positions.sort((a, b) => a - b)
    const minPosition = sortedPositions[0]
    const maxPosition = sortedPositions.slice(-1)[0]
    const posiblePositions = Array(maxPosition - minPosition + 1).fill(0)

    const posibleCosts = posiblePositions.map((position, index) => {
        return positions.reduce((positionCost, currentPosition) => {
            return positionCost + getFuelCost(currentPosition, minPosition + index)
        }, 0)
    })

    return Math.min(...posibleCosts)
}

const getFuelIncrementalCost = (position1, position2) => {
    const distance = Math.abs(position1 - position2)
    let cost = 0
    for (let i = 0; i < distance; i++) {
        cost += (1 + i)
    }
    return cost
}

const cheapestIncrementalCrabsAlignment = (positions) => {
    return cheapestCrabsAlignment(positions, getFuelIncrementalCost)
}

module.exports = { cheapestCrabsAlignment, cheapestIncrementalCrabsAlignment }
