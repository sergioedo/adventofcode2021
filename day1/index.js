const getLargestMeasures = (measures) => {
    return measures.reduce((acc, curr, idx, arr) => {
        if (idx === 0) return 0
        if (curr > arr[idx - 1]) return acc + 1
        return acc
    }, 0)
}

const get3MeasurementSlidingWindow = (measures) => {
    let count = 0
    measures.reduce((acc, curr, idx, arr) => {
        if (idx + 2 >= measures.length) return 0 // no more 3-measurements
        const currMeasure = arr[idx] + arr[idx + 1] + arr[idx + 2]
        if (idx > 0 && currMeasure > acc) count++
        return currMeasure
    }, 0)
    return count
}

module.exports = { getLargestMeasures, get3MeasurementSlidingWindow }
