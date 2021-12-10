const checkLowPoint = (area, row, col) => {
    const leftHigher = col - 1 >= 0 ? (area[row][col] < area[row][col - 1]) : true
    const rightHigher = col + 1 < area[row].length ? (area[row][col] < area[row][col + 1]) : true
    const topHigher = row - 1 >= 0 ? (area[row][col] < area[row - 1][col]) : true
    const downHigher = row + 1 < area.length ? (area[row][col] < area[row + 1][col]) : true
    return leftHigher && rightHigher && topHigher && downHigher
}

const sumRiskLevels = (area) => {
    return area.map((row, rowIdx) => row.filter((col, colIdx) => checkLowPoint(area, rowIdx, colIdx)))
        .flat()
        .reduce((sum, lowPoint) => sum + (lowPoint + 1), 0)
}

const findNextBasinPoint = (area) => {
    for (let row = 0; row < area.length; row++) {
        for (let col = 0; col < area[row].length; col++) {
            if (area[row][col] !== 9) return { row, col }
        }
    }
    return { row: null, col: null } // no more points
}

const getBasin = (area, row, col) => {
    if (area[row][col] === 9) return { updatedArea: area, basin: [] } // no basin here

    const value = area[row][col]
    area[row][col] = 9 // mark as counted as basin
    const { updatedArea: leftUpdatedArea, basin: leftBasin } = col - 1 >= 0 ? getBasin(area, row, col - 1) : { updatedArea: area, basin: [] }
    const { updatedArea: rightUpdatedArea, basin: rightBasin } = col + 1 < area[row].length ? getBasin(area, row, col + 1) : { updatedArea: leftUpdatedArea, basin: [] }
    const { updatedArea: topUpdatedArea, basin: topBasin } = row - 1 >= 0 ? getBasin(area, row - 1, col) : { updatedArea: rightUpdatedArea, basin: [] }
    const { updatedArea: downUpdatedArea, basin: downBasin } = row + 1 < area.length ? getBasin(area, row + 1, col) : { updatedArea: topUpdatedArea, basin: [] }

    return { updatedArea: downUpdatedArea, basin: [value, ...leftBasin, ...rightBasin, ...topBasin, ...downBasin] }
}

const getBasins = (area, basins = []) => {
    const { row, col } = findNextBasinPoint(area)
    if (row === null || col === null) return { area, basins } // no more basins

    const { updatedArea, basin } = getBasin(area, row, col)
    return getBasins(updatedArea, [basin, ...basins])
}

const threeLargestBasins = (area) => {
    return getBasins(area)
        .basins.sort((a, b) => b.length - a.length)
        .slice(0, 3)
        .reduce((acc, basin) => acc * basin.length, 1)
}

module.exports = { sumRiskLevels, threeLargestBasins }
