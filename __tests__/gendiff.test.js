import { describe, expect, test } from '@jest/globals'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8')

const normalize = (str) => {
  return str
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

describe('gendiff', () => {
  describe('flat files', () => {
    test('compares flat JSON files with stylish format', () => {
      const file1 = getFixturePath('file1-flat.json')
      const file2 = getFixturePath('file2-flat.json')
      const expected = readFixture('expected-flat.txt')

      const result = genDiff(file1, file2)
      expect(normalize(result)).toBe(normalize(expected))
    })

    test('compares flat JSON files with plain format', () => {
      const file1 = getFixturePath('file1-flat.json')
      const file2 = getFixturePath('file2-flat.json')
      const expected = readFixture('expected-flat-plain.txt')

      const result = genDiff(file1, file2, 'plain')
      expect(normalize(result)).toBe(normalize(expected))
    })

    test('compares flat JSON files with json format', () => {
      const file1 = getFixturePath('file1-flat.json')
      const file2 = getFixturePath('file2-flat.json')

      const result = genDiff(file1, file2, 'json')

      expect(() => JSON.parse(result)).not.toThrow()

      const parsed = JSON.parse(result)
      expect(Array.isArray(parsed)).toBe(true)

      parsed.forEach((node) => {
        expect(node).toHaveProperty('key')
        expect(node).toHaveProperty('type')
        expect(['added', 'removed', 'unchanged', 'changed']).toContain(node.type)
      })
    })
  })

  describe('nested files', () => {
    test('compares nested JSON files with stylish format (default)', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      const expected = readFixture('expected-stylish.txt')

      const result = genDiff(file1, file2)
      expect(normalize(result)).toBe(normalize(expected))
    })

    test('compares nested JSON files with plain format', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')
      const expected = readFixture('expected-plain.txt')

      const result = genDiff(file1, file2, 'plain')
      expect(normalize(result)).toBe(normalize(expected))
    })

    test('compares nested JSON files with json format', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')

      const result = genDiff(file1, file2, 'json')

      expect(() => JSON.parse(result)).not.toThrow()

      const parsed = JSON.parse(result)
      expect(Array.isArray(parsed)).toBe(true)

      parsed.forEach((node) => {
        expect(node).toHaveProperty('key')
        expect(node).toHaveProperty('type')
        expect(['added', 'removed', 'unchanged', 'changed', 'nested']).toContain(node.type)

        if (node.type === 'nested') {
          expect(node).toHaveProperty('children')
          expect(Array.isArray(node.children)).toBe(true)
        }
      })
    })

    test('compares nested YAML files with stylish format', () => {
      const file1 = getFixturePath('file1.yaml')
      const file2 = getFixturePath('file2.yaml')
      const expected = readFixture('expected-stylish.txt')

      const result = genDiff(file1, file2)
      expect(normalize(result)).toBe(normalize(expected))
    })

    test('compares nested YAML files with plain format', () => {
      const file1 = getFixturePath('file1.yaml')
      const file2 = getFixturePath('file2.yaml')
      const expected = readFixture('expected-plain.txt')

      const result = genDiff(file1, file2, 'plain')
      expect(normalize(result)).toBe(normalize(expected))
    })

    test('compares nested YAML files with json format', () => {
      const file1 = getFixturePath('file1.yaml')
      const file2 = getFixturePath('file2.yaml')

      const result = genDiff(file1, file2, 'json')
      expect(() => JSON.parse(result)).not.toThrow()
    })

    test('compares mixed JSON and YAML files', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.yaml')
      const expected = readFixture('expected-stylish.txt')

      const result = genDiff(file1, file2)
      expect(normalize(result)).toBe(normalize(expected))
    })
  })

  describe('errors', () => {
    test('throws error for non-existent file', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = 'non-existent.json'

      expect(() => genDiff(file1, file2)).toThrow()
    })

    test('throws error for unsupported format', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('unsupported.txt')

      expect(() => genDiff(file1, file2)).toThrow('Unsupported file format')
    })

    test('throws error for unknown output format', () => {
      const file1 = getFixturePath('file1.json')
      const file2 = getFixturePath('file2.json')

      expect(() => genDiff(file1, file2, 'unknown')).toThrow('Unknown format')
    })
  })
})
