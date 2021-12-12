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

const findCavePaths = (connections) => {
    const nodeEdges = connections.reduce((nodes, connection) => {
        const origin = connection.split('-')[0]
        const destination = connection.split('-')[1]
        nodes[origin] = [destination, ...(nodes[origin] || [])]
        if (origin !== 'start' && destination !== 'end') nodes[destination] = [origin, ...(nodes[destination] || [])]
        return nodes
    }, {})
    return findPaths(nodeEdges, ['start'], 'end', checkNoRepeatSmallCaves).length
}

const findCavePathsWitHException = (connections) => {
    return connections
}

module.exports = { findCavePaths, findCavePathsWitHException }
