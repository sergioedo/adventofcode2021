const fs = require('fs')
const { cheapestCrabsAlignment } = require('./index')

test('basic - cheapest crabs alignment fuel costs', () => {
    const initialCrabsPositions = fs.readFileSync('input-basic.txt', 'UTF-8').split(',').map(Number)
    const expected = 37
    expect(cheapestCrabsAlignment(initialCrabsPositions)).toBe(expected)
})

test('complete solution - lanternfish growth rate after 80 days', () => {
    const initialCrabsPositions = fs.readFileSync('input.txt', 'UTF-8').split(',').map(Number)
    const expected = 336721
    expect(cheapestCrabsAlignment(initialCrabsPositions)).toBe(expected)
})
