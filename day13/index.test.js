const fs = require('fs')
const { foldPaperDots, renderPaperCode } = require('./index')

test('basic - dots visible after first fold', () => {
    const input = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const dots = input.filter(line => line.length > 0 && !line.startsWith('fold'))
        .map(line => line.split(',').map(Number))
    const instructions = input.filter(line => line.length > 0 && line.startsWith('fold'))
        .map(line => line.split('=').map((value, index) => index === 0 ? value.slice(-1) : Number(value)))
    const expected = 17
    expect(foldPaperDots(dots, [instructions[0]])).toBe(expected)
})

test('complete solution - dots visible after first fold', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const dots = input.filter(line => line.length > 0 && !line.startsWith('fold'))
        .map(line => line.split(',').map(Number))
    const instructions = input.filter(line => line.length > 0 && line.startsWith('fold'))
        .map(line => line.split('=').map((value, index) => index === 0 ? value.slice(-1) : Number(value)))

    const expected = 781
    expect(foldPaperDots(dots, [instructions[0]])).toBe(expected)
})

test('basic - get code in ascii art', () => {
    const input = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const dots = input.filter(line => line.length > 0 && !line.startsWith('fold'))
        .map(line => line.split(',').map(Number))
    const instructions = input.filter(line => line.length > 0 && line.startsWith('fold'))
        .map(line => line.split('=').map((value, index) => index === 0 ? value.slice(-1) : Number(value)))
    const expected = `
    #####
    #...#
    #...#
    #...#
    #####`.split('\n').slice(1).map(line => line.trim()).join('\n')
    expect(renderPaperCode(dots, instructions)).toBe(expected)
})

test('complete solution - get code in ascii art', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const dots = input.filter(line => line.length > 0 && !line.startsWith('fold'))
        .map(line => line.split(',').map(Number))
    const instructions = input.filter(line => line.length > 0 && line.startsWith('fold'))
        .map(line => line.split('=').map((value, index) => index === 0 ? value.slice(-1) : Number(value)))

    const expected = `
    ###..####.###...##...##....##.###..###.
    #..#.#....#..#.#..#.#..#....#.#..#.#..#
    #..#.###..#..#.#....#.......#.#..#.###.
    ###..#....###..#....#.##....#.###..#..#
    #....#....#.#..#..#.#..#.#..#.#....#..#
    #....####.#..#..##...###..##..#....###.`.split('\n').slice(1).map(line => line.trim()).join('\n')
    expect(renderPaperCode(dots, instructions)).toBe(expected)
})
