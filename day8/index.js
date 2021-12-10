const countUniqueSegmentsNumbers = (outputValues) => {
    const uniqueSegmentsLengths = [2, 3, 4, 7] // 1, 7, 4, 8
    return outputValues.filter(value => uniqueSegmentsLengths.includes(value.length)).length
}

const digits2Letters = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9
}

const sumOutputValues = (entries) => {
    return entries.map(entry => {
        const sortedPatterns = entry.patterns.map(pattern => pattern.split('').sort().join('')).sort((a, b) => a.length - b.length)
        const pattern1 = sortedPatterns[0].split('')
        const pattern7 = sortedPatterns[1].split('')
        const pattern4 = sortedPatterns[2].split('')
        const pattern8 = sortedPatterns[9].split('')

        // diff 7 vs 1 --> "a"
        const a = pattern7.filter(c => !pattern1.includes(c))[0]

        // diff 0,6,9 vs 1 --> "c" --> "f"
        const pattern6 = sortedPatterns
            .filter(pattern => pattern.length === 6) // patterns 0, 6, 9
            .map(pattern => pattern.split(''))
            .filter(pattern => !pattern.includes(pattern1[0]) || !pattern.includes(pattern1[1]))[0] // 6 not includes "c"

        const c = pattern1.filter(c => !pattern6.includes(c))[0]
        const f = pattern1.filter(c => pattern6.includes(c))[0]

        // 0,9 vs 4 --> 0 vs 4 --> "d"
        const pattern10 = sortedPatterns
            .filter(pattern => pattern.length === 6 && pattern !== pattern6.join('')) // patterns 0, 9
            .map(pattern => pattern.split(''))
            .filter(pattern => pattern4.filter(char => pattern.includes(char)).length !== 4)[0] // 9 includes 4, 0 dont
        const d = pattern4.filter(char => !pattern10.includes(char))[0]

        // 8 vs 9 --> e
        const pattern9 = sortedPatterns
            .filter(pattern => pattern.length === 6 && pattern !== pattern6.join('') && pattern !== pattern10.join(''))[0] // pattern 9
            .split('')

        const e = pattern8.filter(char => !pattern9.includes(char))[0]
        const g = pattern9.filter(char => !pattern4.includes(char) && ![a, c, d, e, f].includes(char))[0]
        const b = pattern8.filter(char => ![a, c, d, e, f, g].includes(char))

        const conversion = {
            [a]: 'a',
            [b]: 'b',
            [c]: 'c',
            [d]: 'd',
            [e]: 'e',
            [f]: 'f',
            [g]: 'g'
        }

        return Number(entry.outputValues.map(outputValue => outputValue
            .split('').map(char => conversion[char]).sort().join(''))
            .map(letters => digits2Letters[letters])
            .join('')
        )
    }).reduce((acc, curr) => acc + curr, 0)
}

module.exports = { countUniqueSegmentsNumbers, sumOutputValues }
