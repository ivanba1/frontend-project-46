const stringify = (value, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  if (typeof value !== 'object' || value === null) {
    if (value === '') return ''
    return String(value)
  }

  const keys = Object.keys(value)
  const lines = keys.map((key) => {
    const childValue = value[key]
    const formattedValue = stringify(childValue, depth + 1)
    return `${currentIndent}${key}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (tree, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize - 2)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  const lines = tree.map((node) => {
    const { key, type, value, oldValue, newValue, children } = node

    switch (type) {
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`
      case 'removed':
        return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`
      case 'changed':
        return [
          `${currentIndent}- ${key}: ${stringify(oldValue, depth + 1)}`,
          `${currentIndent}+ ${key}: ${stringify(newValue, depth + 1)}`,
        ]
      case 'nested':
        return `${currentIndent}  ${key}: ${formatStylish(children, depth + 1)}`
      default:
        return ''
    }
  }).flat()

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default formatStylish
