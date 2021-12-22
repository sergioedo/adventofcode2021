const fs = require('fs')
const { playGame } = require('./index')

test('basic - play deterministic 100-sided dice', () => {
    const input = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n').map(player => Number(player.split(':')[1].trim()))
    const expected = 739785

    const { playersScore, diceCount } = playGame(input)
    const losingPlayerScore = playersScore.sort((a, b) => a - b)[0]
    const result = losingPlayerScore * diceCount

    expect(result).toBe(expected)
})

test('complete solution - play deterministic 100-sided dice', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n').map(player => Number(player.split(':')[1].trim()))
    const expected = 925605

    const { playersScore, diceCount } = playGame(input)
    const losingPlayerScore = playersScore.sort((a, b) => a - b)[0]
    const result = losingPlayerScore * diceCount

    expect(result).toBe(expected)
})
