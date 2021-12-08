const familyCount = (cycle, days) => {
    const nextChild = days - cycle
    if (nextChild > 0) {
        return familyCount(6, nextChild - 1) + familyCount(8, nextChild - 1)
    }
    return 1 // no more childs
}

const lanternfishGrowthRate = (fishes, days) => {
    const cacheFamilyCount = {}
    const fishesCount = fishes.map(cycle => {
        if (!cacheFamilyCount[cycle]) {
            cacheFamilyCount[cycle] = familyCount(cycle, days)
        }
        return cacheFamilyCount[cycle]
    })
    return fishesCount.reduce((acc, curr) => acc + curr, 0)
}

module.exports = { lanternfishGrowthRate }
