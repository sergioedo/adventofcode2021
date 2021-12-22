const fs = require('fs')
const { addition, explode, split, finalSum, finalSumMagnitude } = require('./index')

test('basic addition', () => {
    const input1 = '[[[[4,3],4],4],[7,[[8,4],9]]]'
    const input2 = '[1,1]'
    const expected = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]'
    expect(addition(input1, input2)).toBe(expected)
})

test('basic explode 1', () => {
    const input = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]'
    const expected = '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]'
    expect(explode(input)).toBe(expected)
})

test('basic explode 2', () => {
    const input = '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]'
    const expected = '[[[[0,7],4],[15,[0,13]]],[1,1]]'
    expect(explode(input)).toBe(expected)
})

test('basic explode 3', () => {
    const input = '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]'
    const expected = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'
    expect(explode(input)).toBe(expected)
})

test('basic explode 5', () => {
    const input = '[[[[4,0],[5,4]],[[7,0],[15,5]]],[10,[[11,9],[0,[11,8]]]]]'
    const expected = '[[[[4,0],[5,4]],[[7,0],[15,5]]],[10,[[11,9],[11,0]]]]'
    expect(explode(input)).toBe(expected)
})

test('basic split 1', () => {
    const input = '[[[[0,7],4],[15,[0,13]]],[1,1]]'
    const expected = '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]'
    expect(split(input)).toBe(expected)
})

test('basic split 2', () => {
    const input = '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]'
    const expected = '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]'
    expect(split(input)).toBe(expected)
})

test('basic - final sum 1', () => {
    const input = ['[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]', '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]']
    const expected = '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]'
    expect(finalSum(input)).toBe(expected)
})

test('basic - final sum 2', () => {
    const input = fs.readFileSync('input-basic1.txt', 'UTF-8').split('\n')
    const expected = '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
    expect(finalSum(input)).toBe(expected)
})

test('basic - final sum 3', () => {
    const input = fs.readFileSync('input-basic2.txt', 'UTF-8').split('\n')
    const expected = '[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]'
    expect(finalSum(input)).toBe(expected)
})

test('basic 4 - final sum magnitude', () => {
    const input = fs.readFileSync('input-basic2.txt', 'UTF-8').split('\n')
    const expected = 4140
    expect(finalSumMagnitude(input)).toBe(expected)
})

test('complete solution - final sum magnitude', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 4033
    expect(finalSumMagnitude(input)).toBe(expected)
})
