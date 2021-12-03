const fs = require('fs')
const { getPowerConsumption, getLifeSupportRating } = require('./index')

test('basic - power consumption', () => {
    const report = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010'
    ]
    const expected = 198
    expect(getPowerConsumption(report)).toBe(expected)
})

test('complete solution - power consumption', () => {
    const report = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 4138664
    expect(getPowerConsumption(report)).toBe(expected)
})

test('basic - life support rating', () => {
    const report = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010'
    ]
    const expected = 230
    expect(getLifeSupportRating(report)).toBe(expected)
})

test('complete solution - life support rating', () => {
    const report = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 4273224
    expect(getLifeSupportRating(report)).toBe(expected)
})
