const fs = require('fs')
const { findCavePaths } = require('./index')

test('superbasic - find all paths without repeat small caves', () => {
    const connections = ['start-A', 'A-end', 'A-b', 'b-end']
    const expected = 3
    expect(findCavePaths(connections)).toBe(expected)
})

test('basic - find all paths without repeat small caves', () => {
    const connections = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const expected = 10
    expect(findCavePaths(connections)).toBe(expected)
})

test('basic 2 - find all paths without repeat small caves', () => {
    const connections = fs.readFileSync('input-basic2.txt', 'UTF-8').split('\n')
    const expected = 19
    expect(findCavePaths(connections)).toBe(expected)
})

test('basic 3 - find all paths without repeat small caves', () => {
    const connections = fs.readFileSync('input-basic3.txt', 'UTF-8').split('\n')
    const expected = 226
    expect(findCavePaths(connections)).toBe(expected)
})

test('complete solution - find all paths without repeat small caves', () => {
    const connections = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 3563
    expect(findCavePaths(connections)).toBe(expected)
})

// test('superbasic - find all paths without repeat small caves with 1 exception twice', () => {
//     const connections = ['start-A', 'A-end', 'A-b', 'b-end']
//     const expected = 4
//     expect(findCavePathsWithException(connections)).toBe(expected)
// })

// test('basic - find all paths without repeat small caves with 1 exception twice', () => {
//     const connections = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
//     const expected = 36
//     expect(findCavePathsWithException(connections)).toBe(expected)
// })

// test('basic 2 - find all paths without repeat small caves with 1 exception twice', () => {
//     const connections = fs.readFileSync('input-basic2.txt', 'UTF-8').split('\n')
//     const expected = 103
//     expect(findCavePathsWithException(connections)).toBe(expected)
// })

// test('basic 3 - find all paths without repeat small caves with 1 exception twice', () => {
//     const connections = fs.readFileSync('input-basic3.txt', 'UTF-8').split('\n')
//     const expected = 3509
//     expect(findCavePathsWithException(connections)).toBe(expected)
// })

// test('complete solution - find all paths without repeat small caves with 1 exception twice', () => {
//     const connections = fs.readFileSync('input.txt', 'UTF-8').split('\n')
//     const expected = 0
//     expect(findCavePaths(connections)).toBe(expected)
// })
