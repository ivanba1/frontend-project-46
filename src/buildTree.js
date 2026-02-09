const isObject = (value) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = [...new Set([...keys1, ...keys2])].sort()

  return allKeys.map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    const hasKey1 = Object.hasOwn(obj1, key)
    const hasKey2 = Object.hasOwn(obj2, key)

    if (!hasKey1) {
      return {
        key,
        type: 'added',
        value: value2,
      }
    }

    if (!hasKey2) {
      return {
        key,
        type: 'removed',
        value: value1,
      }
    }

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      }
    }

    if (value1 === value2) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      }
    }

    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    }
  })
}

export default buildTree
