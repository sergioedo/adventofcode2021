const fs = require('fs')
const { initCubesOn } = require('./index')

test('basic 1 - number of cubes on after initialization', () => {
    const input = fs.readFileSync('input-basic1.txt', 'UTF-8').split('\n')
        .map(line => {
            const action = line.split(' ')[0]
            const coords = line.split(' ')[1].split(',')
            const xCoords = coords[0].split('=')[1].split('..').map(Number)
            const yCoords = coords[1].split('=')[1].split('..').map(Number)
            const zCoords = coords[2].split('=')[1].split('..').map(Number)

            return { action, xCoords, yCoords, zCoords }
        })
    const expected = 39
    expect(initCubesOn(input)).toBe(expected)
})

test('basic 2 - number of cubes on after initialization', () => {
    const input = fs.readFileSync('input-basic2.txt', 'UTF-8').split('\n')
        .map(line => {
            const action = line.split(' ')[0]
            const coords = line.split(' ')[1].split(',')
            const xCoords = coords[0].split('=')[1].split('..').map(Number)
            const yCoords = coords[1].split('=')[1].split('..').map(Number)
            const zCoords = coords[2].split('=')[1].split('..').map(Number)

            return { action, xCoords, yCoords, zCoords }
        })
    const expected = 590784
    expect(initCubesOn(input)).toBe(expected)
})

test('complete solution - number of cubes on after initialization', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n')
        .map(line => {
            const action = line.split(' ')[0]
            const coords = line.split(' ')[1].split(',')
            const xCoords = coords[0].split('=')[1].split('..').map(Number)
            const yCoords = coords[1].split('=')[1].split('..').map(Number)
            const zCoords = coords[2].split('=')[1].split('..').map(Number)

            return { action, xCoords, yCoords, zCoords }
        })
    const expected = 589411
    expect(initCubesOn(input)).toBe(expected)
})
