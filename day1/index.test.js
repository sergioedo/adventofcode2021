const fs = require('fs')
const { getLargestMeasures, get3MeasurementSlidingWindow } = require('./index')

test('basic test getLargestMeasures', () => {
    const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    const expected = 7
    expect(getLargestMeasures(input)).toBe(expected)
})

test('complete solution getLargestMeasures', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n').map(Number)
    const expected = 1791
    expect(getLargestMeasures(input)).toBe(expected)
})

test('basic test three-measurement sliding window', () => {
    const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    const expected = 5
    expect(get3MeasurementSlidingWindow(input)).toBe(expected)
})

test('basic test three-measurement sliding window', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n').map(Number)
    const expected = 1822
    expect(get3MeasurementSlidingWindow(input)).toBe(expected)
})
