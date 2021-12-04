const parseGame = (game) => {
    const numbers = game[0].split(',').map(Number)
    const boards = game.slice(1).filter(v => v !== '').reduce((boards, row, idx) => {
        if (idx % 5 === 0) boards.push([])
        const boardIndex = Math.floor(idx / 5)
        boards[boardIndex].push(row.replace(/ +/g, ' ').split(' ').filter(v => v !== '').map(Number))
        return boards
    }, [])
    return { numbers, boards }
}

const markBoard = (board, number) => {
    return board.map(row => row.map(n => ({ ...n, marked: (n.marked || (n.value === number)) })))
}
const checkRow = (row) => (row.filter(number => number.marked).length === row.length)

const completedBoard = (board) => {
    // check rows
    const rowCompleted = board.some(row => checkRow(row))
    // check columns: reverse board
    const reversedBoard = board.map((row, rowIdx) => row.map((n, colIdx) => {
        return { ...board[colIdx][rowIdx] }
    }))
    const colsCompleted = reversedBoard.some(row => checkRow(row))
    return rowCompleted || colsCompleted
}

const playBingo = (game) => {
    const { numbers, boards } = parseGame(game)
    const initialState = {
        playedNumbers: [],
        boards: boards.map(board => board.map(row => row.map(value => ({ value, marked: false })))),
        winnerBoard: null
    }

    const gameResult = numbers.reduce((prevState, number) => {
        if (prevState.winnerBoard) return prevState // game finished
        const updatedBoards = prevState.boards.map(board => markBoard(board, number))
        const winnerBoard = updatedBoards.filter(completedBoard)

        const newState = {
            playedNumbers: [...prevState.playedNumbers, number],
            boards: updatedBoards,
            winnerBoard: winnerBoard.length > 0 ? winnerBoard[0] : null
        }
        return newState
    }, initialState)

    const { playedNumbers, winnerBoard } = gameResult
    const lastPlayedNumber = playedNumbers[playedNumbers.length - 1]
    const sumUnMarkedNumbers = winnerBoard.map(row => row.filter(number => !number.marked)).flat().reduce((acc, number) => acc + number.value, 0)

    return lastPlayedNumber * sumUnMarkedNumbers
}

module.exports = { playBingo }
