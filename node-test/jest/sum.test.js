import add from './sum.js';

describe('sum.js', () => {
  test('add to numbers', () => {
   expect(add(1,2)).toBe(3)
  })
})
