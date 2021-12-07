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

const pilotSubmarineWithAim = (movements) => {
    const initialLocation = {
        hPosition: 0,
        depth: 0,
        aim: 0
    }
    const finalLocation = movements.reduce((location, movement) => {
        const { move, positions } = movement
        return {
            aim: location.aim + (move === 'up' ? -positions : move === 'down' ? positions : 0),
            hPosition: location.hPosition + (move === 'forward' ? positions : 0),
            depth: location.depth + (move === 'forward' ? location.aim * positions : 0)
        }
    }, initialLocation)

    return finalLocation.hPosition * finalLocation.depth
}

module.exports = { pilotSubmarine, pilotSubmarineWithAim }
