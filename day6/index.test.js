const fs = require('fs')
const { lanternfishGrowthRate } = require('./index')

test('basic - lanternfish growth rate after 18 days', () => {
    const initialLanternfish = fs.readFileSync('input-basic.txt', 'UTF-8').split(',')
    const expected = 26
    expect(lanternfishGrowthRate(initialLanternfish, 18)).toBe(expected)
})

test('basic - lanternfish growth rate after 80 days', () => {
    const initialLanternfish = fs.readFileSync('input-basic.txt', 'UTF-8').split(',')
    const expected = 5934
    expect(lanternfishGrowthRate(initialLanternfish, 80)).toBe(expected)
})

test('complete solution - lanternfish growth rate', () => {
    const initialLanternfish = fs.readFileSync('input.txt', 'UTF-8').split(',')
    const expected = 372300
    expect(lanternfishGrowthRate(initialLanternfish, 80)).toBe(expected)
})
