// based on  walk-parse5

export default function walk (node, callback) {
  if (callback(node) === false) {
    return false
  } else {
    let childNode, i

    if (node.childNodes !== undefined) {
      i = 0
      childNode = node.childNodes[i]
    }

    while (childNode !== undefined) {
      if (walk(childNode, callback) === false) {
        return false
      } else {
        childNode = node.childNodes[++i]
      }
    }
  }
}
