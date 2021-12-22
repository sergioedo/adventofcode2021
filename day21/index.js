const endGame = (playersScore, turn) => {
    return playersScore.some(score => score >= 1000)
}

const playGame = (playersStartPosition) => {
    const numplayers = playersStartPosition.length
    let turn = 1
    let diceValue = 1
    const boardPositions = 10
    const playersPosition = [...playersStartPosition]
    const playersScore = Array(numplayers).fill(0)

    while (!endGame(playersScore, turn)) {
        const playerIndex = (turn - 1) % numplayers
        playersPosition[playerIndex] = ((playersPosition[playerIndex] - 1 + ((diceValue * 3) + 3)) % boardPositions) + 1
        playersScore[playerIndex] += playersPosition[playerIndex]
        diceValue += 3
        turn++
    }
    return { diceCount: diceValue - 1, playersScore }
}

module.exports = { playGame }
