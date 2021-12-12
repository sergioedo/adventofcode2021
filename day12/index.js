const checkNoRepeatSmallCaves = (path) => {
    if (path.length === 0) return false
    const countSmallCaves = path.filter(node => node === node.toLowerCase())
        .reduce((smallCounter, cave) => {
            smallCounter[cave] = (smallCounter[cave] || 0) + 1
            return smallCounter
        }, {})
    return (Object.values(countSmallCaves).filter(count => count > 1).length) === 0
}

const findPaths = (nodeEdges, inputPath, end, checkValidPath) => {
    const lastNode = inputPath.slice(-1)[0]
    if (lastNode === end) return [inputPath]

    const subPaths = nodeEdges[lastNode].map(destination => {
        const nextPath = [...inputPath, destination]
        if (checkValidPath(nextPath)) {
            return findPaths(nodeEdges, nextPath, end, checkValidPath)
        } else {
            return []
        }
    }).flat()
    return subPaths
}

const getNodeEdges = (connections) => {
    return connections.reduce((nodes, connection) => {
        const origin = connection.split('-')[0]
        const destination = connection.split('-')[1]
        if (destination !== 'start' && origin !== 'end') nodes[origin] = [destination, ...(nodes[origin] || [])]
        if (origin !== 'start' && destination !== 'end') nodes[destination] = [origin, ...(nodes[destination] || [])]
        return nodes
    }, {})
}

const findCavePaths = (connections) => {
    return findPaths(getNodeEdges(connections), ['start'], 'end', checkNoRepeatSmallCaves).length
}

const checkOnlyRepeatOneSmallCave = (path) => {
    if (path.length === 0) return false
    const countSmallCaves = path.filter(node => node === node.toLowerCase())
        .reduce((smallCounter, cave) => {
            smallCounter[cave] = (smallCounter[cave] || 0) + 1
            return smallCounter
        }, {})
    const repeatedSmallCaves = Object.values(countSmallCaves).filter(count => count > 1)
    return repeatedSmallCaves.length === 0 || (repeatedSmallCaves.length === 1 && repeatedSmallCaves[0] === 2)
}

const findCavePathsWithException = (connections) => {
    return findPaths(getNodeEdges(connections), ['start'], 'end', checkOnlyRepeatOneSmallCave).length
}

module.exports = { findCavePaths, findCavePathsWithException }
