const isEven = n => n % 2 === 0

/** 노드 사이를 간선으로 연결 */
const mkConnect = graph => (from, to) => {
  if (!graph[from]) graph[from] = new Set()
  if (!graph[to]) graph[to] = new Set()

  graph[from].add(to)
  graph[to].add(from)
}

/** 노드 사이의 간선을 제거 */
const mkTraverse = graph => (from, to) => {
  graph[from].delete(to)
  graph[to].delete(from)
}

const toGraph = input => {
  const result = {}
  const connect = mkConnect(result)

  for (const [from, to] of input) {
    connect(from, to)
  }
  return result
}

const vertexes = graph => {
  const even = []
  const odd = []

  for (const [node, edges] of Object.entries(graph)) {
    const target = isEven(edges.size) ? even : odd

    target.push(node)
  }
  return { even, odd }
}

const solution = input => findEulerianPath(toGraph(input))

const findEulerianPath = graph => {
  const { even, odd } = vertexes(graph)

  if (![0, 2].includes(odd.length)) {
    return null
  }
  const begin = odd.length === 2 ? odd[0] : even[0]
  return findEulerianPathImpl(graph, begin)
}

const findEulerianPathImpl = (ref, begin) => {
  if (!ref[begin]) throw new Error(`그래프에 ${begin}이 없습니다.`)

  const graph = structuredClone(ref)
  const traverse = mkTraverse(graph)

  let current = begin

  const stack = [current]
  const result = []

  while (stack.length) {
    const candiates = graph[current]

    if (candiates.size > 0) {
      const next = candiates.values().next().value

      stack.push(current)
      traverse(current, next)

      current = next
    } else {
      result.push(current)
      current = stack.pop()
    }
  }
  return result.reverse()
}

if (require.main === module) {
  const fs = require('fs')
  const filename = process.argv[2]

  const input = filename
    ? JSON.parse(fs.readFileSync(filename, 'utf8'))
    : [
        ['A', 'B'],
        ['A', 'D'],
        ['B', 'C'],
        ['B', 'D'],
        ['B', 'E'],
        ['C', 'D'],
        ['C', 'E'],
        ['D', 'E'],
      ]
  console.log('input:', input)
  console.log('solution: ', solution(input))
}
