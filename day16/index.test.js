const fs = require('fs')
const { sumUpVersionNumbers, parsePacket, hex2Bin } = require('./index')

test('basic - parse literal packet', () => {
    const input = hex2Bin('D2FE28')
    const expected = JSON.stringify({
        version: 6,
        type: 4,
        value: 2021
    })
    const result = parsePacket(input)
    delete result.rest
    expect(JSON.stringify(result)).toBe(expected)
})

test('basic - parse operator packet type 0', () => {
    const input = hex2Bin('38006F45291200')
    const expected = JSON.stringify({
        version: 1,
        type: 6,
        value: [
            {
                version: 6,
                type: 4,
                value: 10
            }, {
                version: 2,
                type: 4,
                value: 20
            }
        ]
    })
    const result = parsePacket(input)
    delete result.rest
    expect(JSON.stringify(result)).toBe(expected)
})

test('basic - parse operator packet type 1', () => {
    const input = hex2Bin('EE00D40C823060')
    const expected = JSON.stringify({
        version: 7,
        type: 3,
        value: [
            {
                version: 2,
                type: 4,
                value: 1
            }, {
                version: 4,
                type: 4,
                value: 2
            },
            {
                version: 1,
                type: 4,
                value: 3
            }
        ]
    })
    const result = parsePacket(input)
    delete result.rest
    expect(JSON.stringify(result)).toBe(expected)
})

test('basic 1 - add up the version numbers in all packets', () => {
    const input = '8A004A801A8002F478'
    const expected = 16
    expect(sumUpVersionNumbers(input)).toBe(expected)
})

test('basic 2 - add up the version numbers in all packets', () => {
    const input = '620080001611562C8802118E34'
    const expected = 12
    expect(sumUpVersionNumbers(input)).toBe(expected)
})

test('basic 3 - add up the version numbers in all packets', () => {
    const input = 'C0015000016115A2E0802F182340'
    const expected = 23
    expect(sumUpVersionNumbers(input)).toBe(expected)
})

test('basic 4 - add up the version numbers in all packets', () => {
    const input = 'A0016C880162017C3686B18A3D4780'
    const expected = 31
    expect(sumUpVersionNumbers(input)).toBe(expected)
})

test('basic 5 - add up the version numbers in all packets', () => {
    const input = '0200840080'
    const expected = 0
    expect(sumUpVersionNumbers(input)).toBe(expected)
})

test('complete solution - add up the version numbers in all packets', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8')
    const expected = 947
    expect(sumUpVersionNumbers(input)).toBe(expected)
})
