const fs = require('fs')
const { countUniqueSegmentsNumbers } = require('./index')

test('basic - count unique segments numbers', () => {
    const outputValues = fs.readFileSync('input-basic.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('|')[1].trim())
        .map(values => values.split(' '))
        .flat()
    const expected = 26
    expect(countUniqueSegmentsNumbers(outputValues)).toBe(expected)
})

test('complete solution - cheapest crabs alignment fuel incremental costs', () => {
    const outputValues = fs.readFileSync('input.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('|')[1].trim())
        .map(values => values.split(' '))
        .flat()
    const expected = 390
    expect(countUniqueSegmentsNumbers(outputValues)).toBe(expected)
})
