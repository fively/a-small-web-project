type Node = {
  id: string
  rootId?: string
  parentId?: string
  [key: string]: any
}

/**
 * 创建树节点
 * @param nodes
 * @param parent
 * @param root
 */
export const createNodeTree = (
  nodes: Array<Node>,
  parent: Node,
  root?: Node
): Array<Node> => {
  const children = [] as Array<Node>

  nodes
    .filter((n: Node) => n.parentId === parent.id)
    .forEach((n: Node) => {
      if (!n.parentId) {
        root = n
      }

      children.push({
        ...n,
        id: n.id,
        rootId: root ? root.id : n.id,
        parentId: parent ? parent.id : n.id,
        children: createNodeTree(nodes, n, root)
      })
    })

  return children
}

/**
 * 根据key获取第一个非空节点
 * @param nodes
 * @param key
 * @returns
 */
export const getNodeByKey = (nodes: Array<Node>, key: string): Node | null => {
  if (!key) return null

  for (const n of nodes) {
    if (n[key]) return n

    if (Array.isArray(n.children) && n.children.length > 0) {
      const node = getNodeByKey(n.children, key)
      if (node) {
        return node
      }
    }
  }

  return null
}

/**
 * 根据key、value获取对应节点
 * @param nodes
 * @param key
 * @param value
 * @returns
 */
export const getNodeByValue = (
  nodes: Array<Node>,
  key: string,
  value: string
): Node | null => {
  if (!key) return null

  for (const n of nodes) {
    if (n[key] === value) return n

    if (Array.isArray(n.children) && n.children.length > 0) {
      const node = getNodeByValue(n.children, key, value)
      if (node) {
        return node
      }
    }
  }

  return null
}
