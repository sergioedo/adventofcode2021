const moveSeaCucumbers = (state) => {
    const rightMoveState = state.map((row, rowIdx) => row.map((col, colIdx) => {
        const nextColIdx = (colIdx + 1) % row.length
        const prevColIdx = (row.length + colIdx - 1) % row.length
        const nextColValue = state[rowIdx][nextColIdx]
        const prevColValue = state[rowIdx][prevColIdx]
        if (col === '>' && nextColValue === '.') { // free space to move ahead (right)
            return '.'
        }
        if (col === '.' && prevColValue === '>') { // free space occuped by cucumber on left
            return '>'
        }
        return col
    }))
    const downMoveState = rightMoveState.map((row, rowIdx) => row.map((col, colIdx) => {
        const nextRowIdx = (rowIdx + 1) % state.length
        const prevRowIdx = (state.length + rowIdx - 1) % state.length
        const nextRowValue = rightMoveState[nextRowIdx][colIdx]
        const prevRowValue = rightMoveState[prevRowIdx][colIdx]
        if (col === 'v' && nextRowValue === '.') { // free space to move ahead (down)
            return '.'
        }
        if (col === '.' && prevRowValue === 'v') { // free space occuped by cucumber on top
            return 'v'
        }
        return col
    }))
    return downMoveState
}

const numStepsToStop = (state) => {
    let currentState = JSON.parse(JSON.stringify(state))
    let stop = false
    let steps = 0
    while (!stop) {
        const newState = moveSeaCucumbers(currentState)
        if (JSON.stringify(newState) === JSON.stringify(currentState)) {
            stop = true
        } else {
            currentState = newState
        }
        steps++
    }
    return steps
}

module.exports = { moveSeaCucumbers, numStepsToStop }
