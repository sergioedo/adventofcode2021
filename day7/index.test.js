const fs = require('fs')
const { cheapestCrabsAlignment, cheapestIncrementalCrabsAlignment } = require('./index')

test('basic - cheapest crabs alignment fuel costs', () => {
    const initialCrabsPositions = fs.readFileSync('input-basic.txt', 'UTF-8').split(',').map(Number)
    const expected = 37
    expect(cheapestCrabsAlignment(initialCrabsPositions)).toBe(expected)
})

test('complete solution - cheapest crabs alignment fuel incremental costs', () => {
    const initialCrabsPositions = fs.readFileSync('input.txt', 'UTF-8').split(',').map(Number)
    const expected = 336721
    expect(cheapestCrabsAlignment(initialCrabsPositions)).toBe(expected)
})

test('basic - cheapest crabs alignment fuel with fuel incremental costs', () => {
    const initialCrabsPositions = fs.readFileSync('input-basic.txt', 'UTF-8').split(',').map(Number)
    const expected = 168
    expect(cheapestIncrementalCrabsAlignment(initialCrabsPositions)).toBe(expected)
})

test('complete solution - cheapest crabs alignment fuel incremental costs', () => {
    const initialCrabsPositions = fs.readFileSync('input.txt', 'UTF-8').split(',').map(Number)
    const expected = 91638945
    expect(cheapestIncrementalCrabsAlignment(initialCrabsPositions)).toBe(expected)
})
