const getLinePoints = (start, end) => {
    const [startX, startY] = start.split(',')
    const [endX, endY] = end.split(',')
    if (startX !== endX && startY !== endY) return [] // only horizontal and vertical lines
    const incX = Number(endX) - Number(startX)
    const incY = Number(endY) - Number(startY)
    const steps = Math.max(Math.abs(incX), Math.abs(incY))
    const stepX = incX !== 0 ? incX > 0 ? 1 : -1 : 0
    const stepY = incY !== 0 ? incY > 0 ? 1 : -1 : 0
    // console.log(startX, startY, endX, endY, incX, incY, steps)
    const points = []
    for (let i = 0; i <= steps; i++) {
        const coordX = Number(startX) + (i * stepX)
        const coordY = Number(startY) + (i * stepY)
        // console.log(coordX, coordY)
        points.push(`${coordX},${coordY}`)
    }
    // console.log(points)
    return points
}

const findHydroThermalVents = (locations, count) => {
    const mapLocations = new Map()
    locations.map(line => {
        const [start, end] = line.split('->').map(value => value.trim())
        getLinePoints(start, end).map(point => mapLocations.set(point, (mapLocations.get(point) || 0) + 1))
        return [start, end]
    })
    // console.log(Array.from(mapLocations.values()))
    return Array.from(mapLocations.values()).filter(value => value >= count).length
}

module.exports = { findHydroThermalVents }
