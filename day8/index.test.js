const fs = require('fs')
const { countUniqueSegmentsNumbers, sumOutputValues } = require('./index')

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

test('basic - sum all correct output values - single line', () => {
    const entries = ['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf']
    // const entries = ['fdgcea dgefa efabdg fdgcba dab baefc begd ebdfa db bafgdce | gfbcda cgfadb badcefg eacfgd']
        .map(line => ({
            patterns: line.split('|')[0].trim().split(' ').map(values => values.split(' ')).flat(),
            outputValues: line.split('|')[1].trim().split(' ').map(values => values.split(' ')).flat()
        }))
    const expected = 5353
    expect(sumOutputValues(entries)).toBe(expected)
})

test('basic - sum all correct output values', () => {
    const entries = fs.readFileSync('input-basic.txt', 'UTF-8')
        .split('\n')
        .map(line => ({
            patterns: line.split('|')[0].trim().split(' ').map(values => values.split(' ')).flat(),
            outputValues: line.split('|')[1].trim().split(' ').map(values => values.split(' ')).flat()
        }))
    const expected = 61229
    expect(sumOutputValues(entries)).toBe(expected)
})

test('complete solution - sum all correct output values', () => {
    const entries = fs.readFileSync('input.txt', 'UTF-8')
        .split('\n')
        .map(line => ({
            patterns: line.split('|')[0].trim().split(' ').map(values => values.split(' ')).flat(),
            outputValues: line.split('|')[1].trim().split(' ').map(values => values.split(' ')).flat()
        }))
    const expected = 1011785
    expect(sumOutputValues(entries)).toBe(expected)
})
