const lanternfishGrowthRate = (fishes, days) => {
    if (days === 0) { // no more days...return number of fishes
        return fishes.length
    } else {
        const bornFishesToday = fishes.filter(fish => fish === 0).map(newFish => 8) // new fishes born today
        const grownFishes = fishes.map(fish => fish > 0 ? fish - 1 : 6)
        // console.log(days, grownFishes, bornFishesToday)
        return lanternfishGrowthRate([...grownFishes, ...bornFishesToday], days - 1)
    }
}

module.exports = { lanternfishGrowthRate }
