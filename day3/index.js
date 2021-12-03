const getPowerConsumption = (report) => {
    const initialBitsBalance = report[0].split('').map(bit => 0) // starts with 0 balance in 0 vs 1
    const bitsBalance = report.reduce((prevBalance, currentBits) => {
        return prevBalance.map((bit, idx) => bit + (currentBits[idx] === '1' ? 1 : -1))
    }, initialBitsBalance)

    const gammaRate = parseInt(bitsBalance.map(bitBalance => bitBalance >= 0 ? '1' : '0').join(''), 2)
    const epsilonRate = parseInt(bitsBalance.map(bitBalance => bitBalance >= 0 ? '0' : '1').join(''), 2)
    console.log(gammaRate, epsilonRate)
    return gammaRate * epsilonRate
}

module.exports = { getPowerConsumption }
