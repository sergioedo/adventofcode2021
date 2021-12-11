const fs = require('fs')
const { countOctopusFlashes, firstSyncedFlashesStep } = require('./index')

test('basic - count 25 octopuses flashes after 2 steps', () => {
    const octopuses = fs.readFileSync('input-basic.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 9
    expect(countOctopusFlashes(octopuses, 2)).toBe(expected)
})

test('sample - count 100 octopuses flashes after 2 steps', () => {
    const octopuses = fs.readFileSync('input-sample.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 35
    expect(countOctopusFlashes(octopuses, 2)).toBe(expected)
})

test('sample - count 100 octopuses flashes after 100 steps', () => {
    const octopuses = fs.readFileSync('input-sample.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 1656
    expect(countOctopusFlashes(octopuses, 100)).toBe(expected)
})

test('complete solution - count 100 octopuses flashes after 100 steps', () => {
    const octopuses = fs.readFileSync('input.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 1785
    expect(countOctopusFlashes(octopuses, 100)).toBe(expected)
})

test('sample - first step syncronized flashes', () => {
    const octopuses = fs.readFileSync('input-sample.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 195
    expect(firstSyncedFlashesStep(octopuses)).toBe(expected)
})

test('complete solution - first step syncronized flashes', () => {
    const octopuses = fs.readFileSync('input.txt', 'UTF-8')
        .split('\n')
        .map(line => line.split('').map(Number))
    const expected = 354
    expect(firstSyncedFlashesStep(octopuses)).toBe(expected)
})
