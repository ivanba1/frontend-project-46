const isObject = (value) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const buildPath = (key, parentPath) => {
  return parentPath ? `${parentPath}.${key}` : key
}

const formatNode = (node, parentPath = '') => {
  const { key, type, value, oldValue, newValue, children } = node
  const currentPath = buildPath(key, parentPath)

  switch (type) {
    case 'added':
      return `Property '${currentPath}' was added with value: ${formatValue(value)}`

    case 'removed':
      return `Property '${currentPath}' was removed`

    case 'changed':
      return `Property '${currentPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`

    case 'nested':
      return children
        .map(child => formatNode(child, currentPath))
        .filter(Boolean)
        .join('\n')

    case 'unchanged':
      return ''

    default:
      return ''
  }
}

const formatPlain = (tree) => {
  const lines = tree
    .map(node => formatNode(node))
    .filter(line => line !== '')

  return lines.join('\n')
}

export default formatPlain
