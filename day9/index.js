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
module.exports = { sumRiskLevels }
