const fs = require('fs')
const { sumRiskLevels, threeLargestBasins } = require('./index')

test('basic - sum risk level of low points', () => {
    const area = fs.readFileSync('input-basic.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 15
    expect(sumRiskLevels(area)).toBe(expected)
})

test('complete solution - sum risk level of low points', () => {
    const area = fs.readFileSync('input.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 506
    expect(sumRiskLevels(area)).toBe(expected)
})

test('basic - tree largest basins', () => {
    const area = fs.readFileSync('input-basic.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 1134
    expect(threeLargestBasins(area)).toBe(expected)
})

test('complete solution - tree largest basins', () => {
    const area = fs.readFileSync('input.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 931200
    expect(threeLargestBasins(area)).toBe(expected)
})
