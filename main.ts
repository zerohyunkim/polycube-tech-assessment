import { Graph, Input, mkTraverse, Node, toGraph, vertexes } from "./graph.ts"

export const solution = (input: [Node, Node][]): Node[] | null => findEulerianPath(toGraph(input))

export const findEulerianPath = (graph: Graph): Node[] | null => {
	const { even, odd } = vertexes(graph)

	if (![0, 2].includes(odd.length)) {
		return null
	}
	const begin = odd.length === 2 ? odd[0] : even[0]
	return findEulerianPathImpl(graph, begin)
}

export const findEulerianPathImpl = (ref: Graph, begin: keyof Graph): Node[] => {
	if (!ref[begin]) throw new Error(`그래프에 ${begin}이 없습니다.`)

	const graph: Graph = structuredClone(ref)
	const traverse = mkTraverse(graph)

    let current: Node = begin

    const stack = [current]
	const result: Node[] = []

	while (stack.length) {
		const candiates = graph[current]

		if (candiates.size > 0) {
			const next = candiates.values().next().value

			stack.push(current)
			traverse(current, next)

			current = next
		} else {
			result.push(current)
			current = stack.pop()!
		}
	}
	return result.reverse()
}

if (import.meta.main) {
	const input: Input = [
		["1", "2"],
		["2", "5"],
		["1", "3"],
		["3", "4"],
		["4", "5"],
		["5", "6"],
		["5", "7"],
		["6", "7"],
	]

	const graph = toGraph(input)
	console.log(graph)
	console.log(findEulerianPathImpl(graph, "1"))
}
