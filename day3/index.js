const getBitsBalance = (report) => {
    const initialBitsBalance = report[0].split('').map(bit => 0) // starts with 0 balance in 0 vs 1
    return report.reduce((prevBalance, currentBits) => {
        return prevBalance.map((bit, idx) => bit + (currentBits[idx] === '1' ? 1 : -1))
    }, initialBitsBalance)
}

const getPowerConsumption = (report) => {
    const bitsBalance = getBitsBalance(report)
    const gammaRate = parseInt(bitsBalance.map(bitBalance => bitBalance >= 0 ? '1' : '0').join(''), 2)
    const epsilonRate = parseInt(bitsBalance.map(bitBalance => bitBalance >= 0 ? '0' : '1').join(''), 2)
    return gammaRate * epsilonRate
}

const getRating = (report, getBitFilterValue) => {
    const initialBits = report[0].split('')
    const rating = initialBits.reduce((rateCandidates, bit, bitIndex) => {
        if (rateCandidates.length === 1) return rateCandidates // As there is only one number left => oxygen generator rating found
        const bitsBalance = getBitsBalance(rateCandidates)
        const bitFilterValue = getBitFilterValue(bitsBalance[bitIndex])
        return rateCandidates.filter(value => value[bitIndex] === bitFilterValue)
    }, report)

    return rating[0]
}

const getLifeSupportRating = (report) => {
    const oxigenGeneratorRating = parseInt(getRating(report, bitBalance => bitBalance >= 0 ? '1' : '0'), 2)
    const co2ScrubberRating = parseInt(getRating(report, bitBalance => bitBalance >= 0 ? '0' : '1'), 2)

    return oxigenGeneratorRating * co2ScrubberRating
}

module.exports = { getPowerConsumption, getLifeSupportRating }
