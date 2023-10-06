import { assert, assertEquals, assertFalse } from "https://deno.land/std@0.203.0/assert/mod.ts"
import { findEulerianPath, solution } from "./main.ts"
import { toGraph, vertexes } from "./graph.ts"
import { Graph, Input } from "./graph.ts"

const input: Input = [["A", "B"], ["B", "C"], ["B", "D"], ["C", "D"]]

const graph = {
	A: new Set(["B"]),
	B: new Set(["A", "C", "D"]),
	C: new Set(["B", "D"]),
	D: new Set(["B", "C"]),
}

Deno.test("그래프 생성", () => {
	const result = toGraph(input)
	assertEquals(result, graph)
})

Deno.test("한붓그리기 가능 여부", async (t) => {
	const isEulerianGraph = (graph: Graph) => {
		const odd = vertexes(graph).odd.length

		return odd === 0 || odd === 2
	}

	await t.step("한붓그리기 가능한 그래프", () => {
		assert(isEulerianGraph(graph))
	})

	await t.step("한붓그리기 불가능한 그래프", () => {
		const invalid = {
			...graph,
			D: new Set(["B", "C", "E"]),
			E: new Set(["D"]),
		}

		assertFalse(isEulerianGraph(invalid))
	})
})

Deno.test("짝수점", async (t) => {
	await t.step("예시", () => {
		const result = findEulerianPath(graph)
		assertEquals(result, ["A", "B", "C", "D", "B"])
	})

	await t.step("오각형 + 삼각형", () => {
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
		const result = solution(input)
		assertEquals(result, ["1", "2", "5", "6", "7", "5", "4", "3", "1"])
	})
})

Deno.test("홀수점", async (t) => {
	await t.step("홀수점 2개", async (t) => {
		await t.step("화살표", () => {
			const input: Input = [["A", "B"], ["A", "C"], ["A", "D"], ["B", "C"]]
			assertEquals(solution(input), ["A", "B", "C", "A", "D"])
		})
		await t.step("집", () => {
			const input: Input = [
				["A", "B"],
				["A", "C"],
				["B", "C"],
				["B", "D"],
				["C", "E"],
				["D", "E"],
				["B", "E"],
				["C", "D"],
			]
			assertEquals(solution(input), ["D", "B", "A", "C", "B", "E", "C", "D", "E"])
		})
	})
	await t.step("홀수점 4개", () => {
		const input: Input = [
			["A", "B"],
			["A", "C"],
			["A", "D"],
			["B", "C"],
			["B", "D"],
			["C", "D"],
		]
		assertEquals(solution(input), null)
	})
})
