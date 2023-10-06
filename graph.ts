import { isEven } from "./isEven.ts"

export type Node = string
export type Graph = Record<Node, Set<Node>>
export type Input = [string, string][]


/** 노드 사이를 간선으로 연결 */
export const mkConnect = (graph: Graph) => (from: Node, to: Node) => {
	if (!graph[from]) graph[from] = new Set()
	if (!graph[to]) graph[to] = new Set()

	graph[from].add(to)
	graph[to].add(from)
}

/** 노드 사이의 간선을 제거 */
export const mkTraverse = (graph: Graph) => (from: Node, to: Node) => {
	graph[from].delete(to)
	graph[to].delete(from)
}

export const toGraph = (input: [Node, Node][]): Graph => {
	const result: Graph = {}
	const connect = mkConnect(result)

	for (const [from, to] of input) {
		connect(from, to)
	}
	return result
}

export const vertexes = (graph: Graph): { even: Node[]; odd: Node[] } => {
	const even: Node[] = []
	const odd: Node[] = []

	for (const [node, edges] of Object.entries(graph)) {
		const target = isEven(edges.size) ? even : odd

		target.push(node)
	}
	return { even, odd }
}
