import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import buildTree from './buildTree.js'
import format from './bind/ren.js'

const parseContent = (content, extension) => {
    switch (extension) {
        case '.json':
            return JSON.parse(content)
        case '.yaml':
        case '.yml':
            return yaml.parse(content)
        default:
            throw new Error(`Unsupported file format: ${extension}`)
    }
}

const readFile = (filepath) => {
    const absolutePath = path.resolve(filepath)

    if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found: ${filepath}`)
    }

    return fs.readFileSync(absolutePath, 'utf-8')
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const ext1 = path.extname(filepath1).toLowerCase()
    const ext2 = path.extname(filepath2).toLowerCase()

    const supportedFormats = ['.json', '.yaml', '.yml']
    if (!supportedFormats.includes(ext1) || !supportedFormats.includes(ext2)) {
        const wrongExt = !supportedFormats.includes(ext1) ? ext1 : ext2
        throw new Error(`Unsupported file format: ${wrongExt}`)
    }

    const content1 = readFile(filepath1)
    const content2 = readFile(filepath2)

    const data1 = parseContent(content1, ext1)
    const data2 = parseContent(content2, ext2)

    const tree = buildTree(data1, data2)
    return format(tree, formatName)
}
export default genDiff
