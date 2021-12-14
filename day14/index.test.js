const fs = require('fs')
const { diffPolymerElements } = require('./index')

test('basic - difference between most and least common polymer elements', () => {
    const input = fs.readFileSync('input-basic.txt', 'UTF-8').split('\n')
    const template = input[0]
    const rules = input.slice(2).map(line => line.split(' -> '))
    const expected = 1588
    expect(diffPolymerElements(template, rules, 10)).toBe(expected)
})

test('complete solution - difference between most and least common polymer elements', () => {
    const input = fs.readFileSync('input.txt', 'UTF-8').split('\n')
    const template = input[0]
    const rules = input.slice(2).map(line => line.split(' -> '))
    const expected = 3095
    expect(diffPolymerElements(template, rules, 10)).toBe(expected)
})
