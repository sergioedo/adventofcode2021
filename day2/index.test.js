const fs = require('fs')
const { pilotSubmarine } = require('./index')

test('basic course', () => {
    const course = [
        { move: 'forward', positions: 5 },
        { move: 'down', positions: 5 },
        { move: 'forward', positions: 8 },
        { move: 'up', positions: 3 },
        { move: 'down', positions: 8 },
        { move: 'forward', positions: 2 }
    ]
    const expected = 150
    expect(pilotSubmarine(course)).toBe(expected)
})

test('complete solution pilotSubmarine', () => {
    const course = fs.readFileSync('input.txt', 'UTF-8').split('\n').map(line => ({ move: line.split(' ')[0], positions: Number(line.split(' ')[1]) }))
    const expected = 0
    expect(pilotSubmarine(course)).toBe(expected)
})
