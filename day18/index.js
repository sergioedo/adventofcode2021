const addition = (number1, number2) => {
    if (number1 === undefined) return number2
    if (number2 === undefined) return number1
    return `[${number1},${number2}]`
}

const findFirstNumberIndex = (text) => {
    return text.split('').reduce((firstNumber, char, index) => {
        if (!isNaN(char)) {
            if (firstNumber.endIndex === undefined) {
                if (firstNumber.number === undefined) {
                    firstNumber.startIndex = index
                    firstNumber.number = ''
                }
                firstNumber.number += char
            }
        } else {
            if (firstNumber.startIndex !== undefined && firstNumber.endIndex === undefined) {
                firstNumber.endIndex = index - 1
            }
        }
        return firstNumber
    }, {})
}

const findLastNumberIndex = (text) => {
    return text.split('').reduce((lastNumber, char, index) => {
        if (!isNaN(char)) {
            if (lastNumber.startIndex !== undefined && lastNumber.endIndex !== undefined) {
                lastNumber.startIndex = index
                lastNumber.endIndex = undefined
                lastNumber.number = ''
            }
            if (lastNumber.number === undefined) {
                lastNumber.startIndex = index
                lastNumber.number = ''
            }
            lastNumber.number += char
        } else {
            if (lastNumber.startIndex !== undefined && lastNumber.endIndex === undefined) {
                lastNumber.endIndex = index - 1
            }
        }
        return lastNumber
    }, {})
}

const explode = (number) => {
    // find number to explode
    let countParenthesis = 0
    const { startIndex } = number.split('').reduce((explode, char, index) => {
        if (char === '[') {
            countParenthesis++
        } else if (char === ']') {
            countParenthesis--
        }
        if (!explode.found && countParenthesis >= 5) {
            explode.found = true
            explode.startIndex = index
        }
        return explode
    }, {})

    if (startIndex) {
        const endIndex = startIndex + number.slice(startIndex).indexOf(']')
        const explodeValues = number.slice(startIndex + 1, endIndex).split(',').map(Number)

        const leftValue = findLastNumberIndex(number.slice(0, startIndex))
        const rightValue = findFirstNumberIndex(number.slice(endIndex))

        const leftPart = leftValue.number
            ? number.slice(0, leftValue.startIndex) + (explodeValues[0] + Number(leftValue.number)) + number.slice(leftValue.endIndex + 1, startIndex)
            : number.slice(0, startIndex)
        const rightPart = rightValue.number
            ? number.slice(endIndex + 1, endIndex + rightValue.startIndex) + (explodeValues[1] + Number(rightValue.number)) + number.slice(endIndex + rightValue.endIndex + 1)
            : number.slice(endIndex + 1)
        return leftPart + '0' + rightPart
    }
    return number
}

const findFirstSplitNumberIndex = (text) => {
    return text.split('').reduce((firstSplitNumber, char, index) => {
        if (!isNaN(char)) {
            if (firstSplitNumber.endIndex === undefined) {
                if (firstSplitNumber.number === undefined) {
                    firstSplitNumber.startIndex = index
                    firstSplitNumber.number = ''
                }
                firstSplitNumber.number += char
            }
        } else {
            if (firstSplitNumber.startIndex !== undefined && firstSplitNumber.endIndex === undefined) {
                firstSplitNumber.endIndex = index - 1
                if (Number(firstSplitNumber.number) < 10) {
                    firstSplitNumber.startIndex = undefined
                    firstSplitNumber.endIndex = undefined
                    firstSplitNumber.number = undefined
                }
            }
        }
        return firstSplitNumber
    }, {})
}

const split = (input) => {
    const { startIndex, endIndex, number } = findFirstSplitNumberIndex(input)
    if (number !== undefined) {
        const left = Math.floor(Number(number) / 2)
        const right = Math.floor(Number(number) / 2) + (Number(number) % 2)
        return `${input.slice(0, startIndex)}[${left},${right}]${input.slice(endIndex + 1)}`
    }
    return input
}

const finalSum = (inputs) => {
    return inputs.reduce((acc, input) => {
        acc = addition(acc, input)
        let reduced = false
        while (!reduced) {
            const exploded = explode(acc)
            if (acc === exploded) {
                const splitted = split(acc)
                if (acc === splitted) {
                    reduced = true
                } else {
                    acc = splitted
                }
            } else {
                acc = exploded
            }
        }
        return acc
    })
}

const sumMagnitude = (number) => {
    if (Array.isArray(number)) {
        return (3 * sumMagnitude(number[0])) + (2 * sumMagnitude(number[1]))
    } else {
        return number
    }
}

const finalSumMagnitude = (inputs) => {
    return sumMagnitude(JSON.parse(finalSum(inputs)))
}

const maxMagnitudeSum = (inputs) => {
    let maxMagnitude = -Infinity
    for (let i = 0; i < inputs.length; i++) {
        const firstNumber = inputs[i]
        for (let j = i + 1; j < inputs.length; j++) {
            const secondNumber = inputs[j]
            const magnitude = finalSumMagnitude([firstNumber, secondNumber])
            const reversedMagnitude = finalSumMagnitude([secondNumber, firstNumber])
            maxMagnitude = Math.max(maxMagnitude, magnitude, reversedMagnitude)
        }
    }
    return maxMagnitude
}

module.exports = { addition, explode, split, finalSum, finalSumMagnitude, maxMagnitudeSum }
