const countUniqueSegmentsNumbers = (outputValues) => {
    const uniqueSegmentsLengths = [2, 3, 4, 7] // 1, 7, 4, 8
    return outputValues.filter(value => uniqueSegmentsLengths.includes(value.length)).length
}

module.exports = { countUniqueSegmentsNumbers }
