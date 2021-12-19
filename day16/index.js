const _hex2Bin = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: '1000',
    9: '1001',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111'
}
const hex2Bin = (hexInput) => hexInput.split('').map(char => _hex2Bin[char]).join('')

const parseHeader = (input) => {
    return {
        version: parseInt(input.slice(0, 3), 2),
        type: parseInt(input.slice(3, 6), 2),
        value: input.slice(6)
    }
}

const parseLiteralValue = (input) => {
    const parts = []
    let lastPart = false
    let index = 0
    while (!lastPart) {
        if (input.slice(index, index + 1) === '0') lastPart = true
        parts.push(input.slice(index, index + 5))
        index += 5
    }
    return {
        value: parseInt(parts.map(part => part.slice(1)).join(''), 2),
        input: input.slice(0, index),
        rest: input.slice(index)
    }
}

const parseOperatorValue = (input) => {
    const type = parseInt(input[0], 2)
    const value = input.slice(1)
    if (type === 0) {
        const subPacketsLength = parseInt(value.slice(0, 15), 2)
        let subPacketsInput = value.slice(15, 15 + subPacketsLength)
        const subPackets = []
        while (subPacketsInput.length > 0) {
            const operatorPacket = parsePacket(subPacketsInput)
            subPacketsInput = operatorPacket.rest
            delete operatorPacket.rest
            subPackets.push(operatorPacket)
        }
        return { value: subPackets, rest: value.slice(15 + subPacketsLength) }
    }
    if (type === 1) {
        const numSubPackets = parseInt(value.slice(0, 11), 2)
        let subPacketsInput = value.slice(11)
        const subPackets = []
        for (let i = 0; i < numSubPackets; i++) {
            const subPacket = parsePacket(subPacketsInput)
            subPacketsInput = subPacket.rest
            delete subPacket.rest
            subPackets.push(subPacket)
        }
        return { value: subPackets, rest: subPacketsInput }
    }
}

const parsePacket = (input) => {
    const { type, version, value } = parseHeader(input)

    if (type === 4) {
        const resultValue = parseLiteralValue(value)
        return {
            version,
            type,
            value: resultValue.value,
            rest: resultValue.rest
        }
    } else {
        const resultValue = parseOperatorValue(value)
        return {
            version,
            type,
            value: resultValue.value,
            rest: resultValue.rest
        }
    }
}

const sumUpPacketVersions = (packet) => {
    if (Array.isArray(packet.value)) {
        return packet.value.reduce((acc, p) => {
            return acc + sumUpPacketVersions(p)
        }, packet.version)
    } else {
        return packet.version
    }
}

const sumUpVersionNumbers = (input) => {
    const packet = parsePacket(hex2Bin(input))
    return sumUpPacketVersions(packet)
}

module.exports = { sumUpVersionNumbers, parsePacket, hex2Bin }
