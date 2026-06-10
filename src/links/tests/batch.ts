import { describe, expect, test } from 'vitest'

import { chunkArray } from '../lib/batch'

describe('chunkArray', () => {
  test('creates full-size batches when evenly divisible', () => {
    expect(chunkArray([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  test('includes a final partial batch for remainder items', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  test('returns an empty array when input is empty', () => {
    expect(chunkArray([], 3)).toEqual([])
  })

  test('throws when batch size is not a positive integer', () => {
    expect(() => chunkArray([1], 0)).toThrow(/positive integer/)
    expect(() => chunkArray([1], -1)).toThrow(/positive integer/)
    expect(() => chunkArray([1], 1.5)).toThrow(/positive integer/)
  })
})
