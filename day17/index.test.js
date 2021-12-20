const { getTrajectoriesToPoint, highestYTrajectory } = require('./index')

test('basic - get trajectory with highest y position to a point', () => {
    const expected = [[7, 2], [7, 6]].toString()
    expect(getTrajectoriesToPoint(28, -7).toString()).toBe(expected)
})

test('basic - get trajectory with highest y position', () => {
    const expected = 45
    expect(highestYTrajectory(20, 30, -10, -5)).toBe(expected)
})

test('complete solution - get trajectory with highest y position', () => {
    const expected = 7875
    expect(highestYTrajectory(217, 240, -126, -69)).toBe(expected)
})
