const fs = require('fs')
const { syntaxErrorScore, middleScore } = require('./index')

test('basic - syntax error score', () => {
    const chunks = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const expected = 26397
    expect(syntaxErrorScore(chunks)).toBe(expected)
})

test('complete solution - syntax error score', () => {
    const chunks = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 311949
    expect(syntaxErrorScore(chunks)).toBe(expected)
})

test('basic - middle score', () => {
    const chunks = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const expected = 288957
    expect(middleScore(chunks)).toBe(expected)
})

test('complete solution - middle score', () => {
    const chunks = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const expected = 3042730309
    expect(middleScore(chunks)).toBe(expected)
})
