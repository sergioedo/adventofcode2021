const numFlash = (octos, row, col) => {
    if (row < 0 || row >= octos.length || col < 0 || col >= octos[0].length) return 0
    return (octos[row][col] === -1) ? 1 : 0
}

const countAdjacentFlashes = (octos, row, col) => {
    return numFlash(octos, row - 1, col - 1) +
        numFlash(octos, row - 1, col) +
        numFlash(octos, row - 1, col + 1) +
        numFlash(octos, row, col - 1) +
        numFlash(octos, row, col + 1) +
        numFlash(octos, row + 1, col - 1) +
        numFlash(octos, row + 1, col) +
        numFlash(octos, row + 1, col + 1)
}

const expandEnergy = (octopuses) => {
    const newFlashes = octopuses.flat().filter(octo => octo === 10).length
    if (newFlashes === 0) return octopuses

    const markedOctos = octopuses.map(row => row.map(octo => octo === 10 ? -1 : octo))
    for (let row = 0; row < markedOctos.length; row++) {
        for (let col = 0; col < markedOctos[0].length; col++) {
            const octoEnergy = markedOctos[row][col]
            if (octoEnergy >= 0 && octoEnergy < 10) { // increase energy from adjacents flashes
                markedOctos[row][col] = Math.min(10, octoEnergy + countAdjacentFlashes(markedOctos, row, col))
            }
        }
    }
    const unMarkedOctos = markedOctos.map(row => row.map(octo => octo === -1 ? 11 : octo))
    return expandEnergy(unMarkedOctos)
}

const updateOctopusesEnergy = (octopuses) => {
    const updatedOctos = octopuses.map(row => row.map(octo => octo + 1))
    return expandEnergy(updatedOctos).map(row => row.map(octo => octo > 9 ? 0 : octo))
}

const countOctopusFlashes = (octopuses, steps) => {
    if (steps === 0) return 0
    const updatedOctopuses = updateOctopusesEnergy(octopuses)
    const flashesCount = updatedOctopuses.map(row => row.filter(octo => octo === 0)).flat().length
    const nextFlashesCount = countOctopusFlashes(updatedOctopuses, steps - 1)
    return flashesCount + nextFlashesCount
}

const firstSyncedFlashesStep = (octopuses, step = 0) => {
    const syncedFlashes = octopuses.map(row => row.filter(octo => octo !== 0)).flat().length === 0
    if (syncedFlashes) return step

    const updatedOctopuses = updateOctopusesEnergy(octopuses)
    return firstSyncedFlashesStep(updatedOctopuses, step + 1)
}

module.exports = { countOctopusFlashes, firstSyncedFlashesStep }
