const getLargestMeasures = (measures) => {
    return measures.reduce((acc, curr, idx, arr) => {
        if (idx === 0) return 0
        if (curr > arr[idx - 1]) return acc + 1
        return acc
    }, 0)
}
module.exports = getLargestMeasures
