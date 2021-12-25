const fs = require('fs')
const { moveSeaCucumbers, numStepsToStop } = require('./index')

test('basic - check sea cucumbers state after initial steps', () => {
    const initialState = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n').map(line => line.split(''))
    const resultStep1 = moveSeaCucumbers(initialState)
    const resultStep2 = moveSeaCucumbers(resultStep1)

    const expected = fs.readFileSync('input-basic-step1.txt', 'UTF-8').split('\n').map(line => line.split(''))
    expect(JSON.stringify(resultStep1, null, 4)).toBe(JSON.stringify(expected, null, 4))

    const expected2 = fs.readFileSync('input-basic-step2.txt', 'UTF-8').split('\n').map(line => line.split(''))
    expect(JSON.stringify(resultStep2, null, 4)).toBe(JSON.stringify(expected2, null, 4))
})

test('basic - gets steps to stop check sea cucumbers', () => {
    const initialState = fs.readFileSync('input-basic2.txt', 'UTF-8').split('\n').map(line => line.split(''))
    const expected = 58
    expect(numStepsToStop(initialState)).toBe(expected)
})

test('basic - gets steps to stop check sea cucumbers', () => {
    const initialState = fs.readFileSync('input.txt', 'UTF-8').split('\n').map(line => line.split(''))
    const expected = 329
    expect(numStepsToStop(initialState)).toBe(expected)
})
