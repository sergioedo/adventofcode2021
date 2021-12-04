const fs = require('fs')
const { playBingo } = require('./index')

test('basic - bingo game - row winner', () => {
    const game = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n').filter(value => value !== '')
    const expected = 4512
    expect(playBingo(game)).toBe(expected)
})

test('basic - bingo game - column winner', () => {
    const game = fs.readFileSync('input-basic-column.txt', 'UTF-8').split('\n').filter(value => value !== '')
    const expected = 3456
    expect(playBingo(game)).toBe(expected)
})

test('complete solution - bingo game', () => {
    const game = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 14093
    expect(playBingo(game)).toBe(expected)
})
