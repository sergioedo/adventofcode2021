const fs = require('fs')
const { sumRiskLevels } = require('./index')

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
    const expected = 0
    expect(sumRiskLevels(area)).toBe(expected)
})
