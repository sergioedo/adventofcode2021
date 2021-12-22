const fs = require('fs')
const { playGame, playMultiVerseGame } = require('./index')

test('basic - play deterministic 100-sided dice', () => {
    const playersStartPosition = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n').map(player => Number(player.split(':')[1].trim()))
    const expected = 739785

    const { playersScore, diceCount } = playGame(playersStartPosition, playersStartPosition.map(player => 0))
    const losingPlayerScore = Math.min(...playersScore)
    const result = losingPlayerScore * diceCount

    expect(result).toBe(expected)
})

test('complete solution - play deterministic 100-sided dice', () => {
    const playersStartPosition = fs.readFileSync('input.txt', 'UTF-8').split('\n').map(player => Number(player.split(':')[1].trim()))
    const expected = 925605

    const { playersScore, diceCount } = playGame(playersStartPosition, playersStartPosition.map(player => 0))
    const losingPlayerScore = Math.min(...playersScore)
    const result = losingPlayerScore * diceCount

    expect(result).toBe(expected)
})

test('basic - play multiverse 3-sided dice', () => {
    const playersStartPosition = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n').map(player => Number(player.split(':')[1].trim()))
    const expected = 444356092776315

    const playersUniverseWins = playMultiVerseGame(playersStartPosition, playersStartPosition.map(player => 0))
    const winnerPlayerUniverses = Math.max(...playersUniverseWins)
    expect(winnerPlayerUniverses).toBe(expected)
})

test('complete solution - play multiverse 3-sided dice', () => {
    const playersStartPosition = fs.readFileSync('input.txt', 'UTF-8').split('\n').map(player => Number(player.split(':')[1].trim()))
    const expected = 486638407378784

    const playersUniverseWins = playMultiVerseGame(playersStartPosition, playersStartPosition.map(player => 0))
    const winnerPlayerUniverses = Math.max(...playersUniverseWins)
    expect(winnerPlayerUniverses).toBe(expected)
})
