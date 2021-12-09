const cheapestCrabsAlignment = (positions) => {
    const sortedPositions = positions.sort((a, b) => a - b)
    const minPosition = sortedPositions[0]
    const maxPosition = sortedPositions.slice(-1)[0]
    const posiblePositions = Array(maxPosition - minPosition + 1).fill(0)

    const posibleCosts = posiblePositions.map((position, index) => {
        return positions.reduce((positionCost, currentPosition) => {
            return positionCost + Math.abs(currentPosition - (minPosition + index))
        }, 0)
    })

    return Math.min(...posibleCosts)
}

module.exports = { cheapestCrabsAlignment }
