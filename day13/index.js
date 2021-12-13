const foldPaper = (dots, instructions) => {
    return instructions.reduce((accDots, instruction) => {
        const [axis, axisValue] = instruction
        const coord = axis === 'x' ? 0 : 1
        const firstPartDots = accDots.filter(dot => dot[coord] < axisValue)
        return accDots.filter(dot => dot[coord] > axisValue)
            .reduce((mergedDots, dot) => {
                const reversedDot = [...dot]
                reversedDot[coord] = axisValue - (reversedDot[coord] - axisValue)
                const found = mergedDots.filter(dot => dot[0] === reversedDot[0] && dot[1] === reversedDot[1]).length > 0
                if (!found) mergedDots.push(reversedDot)
                return mergedDots
            }, firstPartDots)
    }, dots)
}

const foldPaperDots = (dots, instructions) => foldPaper(dots, instructions).length

const renderDots = (dots) => {
    const rows = dots.reduce((maxY, dot) => Math.max(maxY, dot[1]), 0) + 1
    const cols = dots.reduce((maxX, dot) => Math.max(maxX, dot[0]), 0) + 1
    const render = [...Array(rows)].map(row => Array(cols))
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const found = dots.filter(dot => dot[0] === col && dot[1] === row).length > 0
            const char = found ? '#' : '.'
            render[row][col] = char
        }
    }
    return render.map(row => row.join('')).join('\n')
}

const renderPaperCode = (dots, instructions) => renderDots(foldPaper(dots, instructions))

module.exports = { foldPaperDots, renderPaperCode }
