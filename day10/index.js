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

module.exports = { syntaxErrorScore }
