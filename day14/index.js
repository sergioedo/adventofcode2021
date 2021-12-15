const resultsCache = {}

const mergeCounters = (counter1, counter2) => {
    const counter = { ...counter1 }
    Object.keys(counter2).forEach(char => {
        counter[char] = (counter[char] || 0) + counter2[char]
    })
    return counter
}

const countPairElements = (inputPair, rules, steps) => {
    if (resultsCache[inputPair] && resultsCache[inputPair][steps]) return resultsCache[inputPair][steps]
    if (steps === 0) return 0

    const newChar = rules[inputPair]
    const counter1 = countPairElements(inputPair.split('')[0] + newChar, rules, steps - 1)
    const counter2 = countPairElements(newChar + inputPair.split('')[1], rules, steps - 1)
    const counter = mergeCounters(counter1, counter2)
    counter[newChar] = (counter[newChar] || 0) + 1

    if (!resultsCache[inputPair]) resultsCache[inputPair] = {}
    resultsCache[inputPair][steps] = counter
    return counter
}

const clearCache = (cache) => {
    Object.keys(cache).forEach(key => {
        delete cache[key]
    })
}

const diffPolymerElements = (template, rules, steps) => {
    const pairRules = rules.reduce((acc, rule) => {
        acc[rule[0]] = rule[1]
        return acc
    }, {})

    const inputPairs = template.split('').map((char, idx) => {
        const pair = template.slice(idx, idx + 2)
        return pair
    }).filter(pair => pair.length >= 2)

    clearCache(resultsCache)
    const initialCounter = template.split('').reduce((counter, char) => ({ ...counter, [char]: (counter[char] || 0) + 1 }), {})
    const countElements = inputPairs.reduce((counter, pair) => {
        const pairCounter = countPairElements(pair, pairRules, steps)
        return mergeCounters(counter, pairCounter)
    }, initialCounter)

    const minCommon = Math.min(...Object.values(countElements))
    const maxCommon = Math.max(...Object.values(countElements))

    return maxCommon - minCommon
}

module.exports = { diffPolymerElements }
