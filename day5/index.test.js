const fs = require('fs')
const { findHydroThermalVents } = require('./index')

test('basic - hydrothermal vents', () => {
    const locations = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const expected = 5
    expect(findHydroThermalVents(locations, 2)).toBe(expected)
})

test('complete solution - hydrothermal vents', () => {
    const locations = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 5442
    expect(findHydroThermalVents(locations, 2)).toBe(expected)
})

test('basic - hydrothermal vents with diagonals', () => {
    const locations = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const expected = 12
    expect(findHydroThermalVents(locations, 2, true)).toBe(expected)
})

test('complete solution - hydrothermal vents with diagonals', () => {
    const locations = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 19571
    expect(findHydroThermalVents(locations, 2, true)).toBe(expected)
})
