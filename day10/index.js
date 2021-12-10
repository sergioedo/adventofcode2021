const startChars = ['(', '[', '{', '<']
const endChars = [')', ']', '}', '>']
const charsScore = {
    ')': 3, ']': 57, '}': 1197, '>': 25137
}

const syntaxErrorScore = (chunks) => {
    return chunks.map(line => {
        const chars = line.split('')
        const stack = []
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i]
            if (startChars.includes(char)) {
                stack.push(char)
            } else {
                const startChar = stack.splice(-1)[0]
                const idxChar = startChars.indexOf(startChar)
                if (char !== endChars[idxChar]) {
                    // return `Expected ${endChars[idxChar]} but found ${char}`
                    return char
                }
            }
        }
        // return `ommited line: ${line}`
        return ''
    })
        .filter(char => char !== '')
        .reduce((acc, char) => acc + charsScore[char], 0)
}

const charsPoints = {
    ')': 1, ']': 2, '}': 3, '>': 4
}

const middleScore = (chunks) => {
    return chunks.map(line => {
        const chars = line.split('')
        const stack = []
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i]
            if (startChars.includes(char)) {
                stack.push(char)
            } else {
                const startChar = stack.splice(-1)[0]
                const idxChar = startChars.indexOf(startChar)
                if (char !== endChars[idxChar]) {
                    return []
                }
            }
        }
        return stack.map(char => endChars[startChars.indexOf(char)]).reverse()
    })
        .filter(chars => chars.length !== 0)
        .map(chars => chars.reduce((acc, char) => (acc * 5) + charsPoints[char], 0))
        .sort((a, b) => a - b)
        .reduce((acc, value, idx, array) => array[Math.floor(array.length / 2)], 0)
}

module.exports = { syntaxErrorScore, middleScore }
