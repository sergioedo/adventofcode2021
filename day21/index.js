const endGameByScore = (winScore) => (playersScore) => {
    return playersScore.some(score => score >= winScore)
}

const updatePlayerPositionScore = (playersStartPosition, playersStartScore, turn, diceValue) => {
    const numPlayers = playersStartPosition.length
    const boardPositions = 10

    const playersPosition = [...playersStartPosition]
    const playersScore = [...playersStartScore]
    const playerIndex = (turn - 1) % numPlayers
    playersPosition[playerIndex] = ((playersPosition[playerIndex] - 1 + (diceValue)) % boardPositions) + 1
    playersScore[playerIndex] += playersPosition[playerIndex]

    return { playersPosition, playersScore }
}

const playGame = (playersStartPosition, playersStartScore, turn = 1, diceValue = 1, endGame = endGameByScore(1000)) => {
    if (endGame(playersStartScore)) {
        return { diceCount: diceValue - 1, playersScore: playersStartScore }
    }
    const { playersPosition, playersScore } = updatePlayerPositionScore(playersStartPosition, playersStartScore, turn, (diceValue * 3) + 3)
    return playGame(playersPosition, playersScore, turn + 1, diceValue + 3, endGame)
}

const cache = {}

const possibleDiceValues = [
    [1, 1, 1], [1, 1, 2], [1, 1, 3],
    [1, 2, 1], [1, 2, 2], [1, 2, 3],
    [1, 3, 1], [1, 3, 2], [1, 3, 3],
    [2, 1, 1], [2, 1, 2], [2, 1, 3],
    [2, 2, 1], [2, 2, 2], [2, 2, 3],
    [2, 3, 1], [2, 3, 2], [2, 3, 3],
    [3, 1, 1], [3, 1, 2], [3, 1, 3],
    [3, 2, 1], [3, 2, 2], [3, 2, 3],
    [3, 3, 1], [3, 3, 2], [3, 3, 3]
].map(diceValues => diceValues[0] + diceValues[1] + diceValues[2])

const playMultiVerseGame = (playersStartPosition, playersStartScore, turn = 1, endGame = endGameByScore(21)) => {
    if (endGame(playersStartScore)) {
        const maxScore = Math.max(...playersStartScore)
        return playersStartScore.map(score => (score === maxScore) ? 1 : 0)
    }

    let playersWins = playersStartScore.map(wins => 0)
    if (cache[`${playersStartPosition.toString()}-${playersStartScore.toString()}-${turn}`]) {
        playersWins = cache[`${playersStartPosition.toString()}-${playersStartScore.toString()}-${turn}`]
    } else {
        possibleDiceValues.forEach(diceValue => {
            const { playersPosition, playersScore } = updatePlayerPositionScore(playersStartPosition, playersStartScore, turn, diceValue)
            const result = playMultiVerseGame(playersPosition, playersScore, turn + 1, endGame)
            result.forEach((playerWins, playerIndex) => {
                playersWins[playerIndex] += result[playerIndex]
            })
        })
        cache[`${playersStartPosition.toString()}-${playersStartScore.toString()}-${turn}`] = playersWins
    }

    return playersWins
}

module.exports = { playGame, playMultiVerseGame }
