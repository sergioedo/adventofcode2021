const getLinePoints = (start, end, includeDiagonals) => {
    const [startX, startY] = start.split(',')
    const [endX, endY] = end.split(',')
    if (!includeDiagonals && startX !== endX && startY !== endY) return [] // only horizontal and vertical lines
    const incX = Number(endX) - Number(startX)
    const incY = Number(endY) - Number(startY)
    const steps = Math.max(Math.abs(incX), Math.abs(incY))
    const stepX = incX !== 0 ? incX > 0 ? 1 : -1 : 0
    const stepY = incY !== 0 ? incY > 0 ? 1 : -1 : 0

    const points = []
    for (let i = 0; i <= steps; i++) {
        const coordX = Number(startX) + (i * stepX)
        const coordY = Number(startY) + (i * stepY)
        // console.log(coordX, coordY)
        points.push(`${coordX},${coordY}`)
    }

    return points
}

const findHydroThermalVents = (locations, count, includeDiagonals = false) => {
    const mapLocations = new Map()
    locations.map(line => {
        const [start, end] = line.split('->').map(value => value.trim())
        getLinePoints(start, end, includeDiagonals).map(point => mapLocations.set(point, (mapLocations.get(point) || 0) + 1))
        return [start, end]
    })
    return Array.from(mapLocations.values()).filter(value => value >= count).length
}

module.exports = { findHydroThermalVents }
