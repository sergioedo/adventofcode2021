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
    }, dots).length
}

module.exports = { foldPaper }
