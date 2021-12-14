const buildPolymer = (input, pairs, steps) => {
    if (steps === 0) return input

    const insertChars = input.split('').map((char, idx) => {
        const pair = input.slice(idx, idx + 2)
        return pairs[pair] || ''
    })

    const newInput = input.split('').map((char, idx) => char + insertChars[idx]).join('')
    return buildPolymer(newInput, pairs, steps - 1)
}

const diffPolymerElements = (template, rules, steps) => {
    const pairs = rules.reduce((acc, rule) => {
        acc[rule[0]] = rule[1]
        return acc
    }, {})

    const polymer = buildPolymer(template, pairs, steps)
    const countElements = polymer.split('').reduce((acc, char) => {
        acc[char] = (acc[char] | 0) + 1
        return acc
    }, {})

    const minCommon = Math.min(...Object.values(countElements))
    const maxCommon = Math.max(...Object.values(countElements))

    return maxCommon - minCommon
}
module.exports = { diffPolymerElements }
