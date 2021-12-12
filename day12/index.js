const findPaths = (nodeEdges, start, end) => {
    if (start === end) return [[end]]
    const nodeEdgesUpdated = Object.keys(nodeEdges).reduce((newNodeEdges, node) => {
        newNodeEdges[node] = nodeEdges[node].filter(destination => {
            if (start === start.toLowerCase() && destination === start) return false
            return true
        })
        return newNodeEdges
    }, {})
    const subPaths = nodeEdges[start].map(destination => {
        return findPaths(nodeEdgesUpdated, destination, end)
    })
        .filter(paths => paths.filter(path => path.length !== 0))
        .map(paths => paths.map(path => [start, ...path]))
        .flat()

    return subPaths
}

const findCavePaths = (connections) => {
    const nodeEdges = connections.reduce((nodes, connection) => {
        const origin = connection.split('-')[0]
        const destination = connection.split('-')[1]
        nodes[origin] = [destination, ...(nodes[origin] || [])]
        nodes[destination] = [origin, ...(nodes[destination] || [])]
        return nodes
    }, {})
    nodeEdges.end = []

    return findPaths(nodeEdges, 'start', 'end').length
}

module.exports = { findCavePaths }
