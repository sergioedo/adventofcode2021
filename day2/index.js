const pilotSubmarine = (movements) => {
    const initialLocation = {
        hPosition: 0,
        depth: 0
    }
    const finalLocation = movements.reduce((location, movement) => {
        const { move, positions } = movement
        return {
            hPosition: location.hPosition + (move === 'forward' ? positions : 0),
            depth: location.depth + (move === 'up' ? -positions : move === 'down' ? positions : 0)
        }
    }, initialLocation)

    return finalLocation.hPosition * finalLocation.depth
}

module.exports = { pilotSubmarine }
