const getLargestMeasures = require('./index')

test('basic test', () => {
    const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    const expected = 7
    expect(getLargestMeasures(input)).toBe(expected)
})
