export const frequency = <T>(items: T[]): Map<T, number> => {
	const map = new Map<T, number>()
	for (const item of items) {
		map.set(item, (map.get(item) ?? 0) + 1)
	}
	return map
}

export const countAnagrams = (words: string[]): number => {
	const sortedWords = words.map((word) => word.split("").sort().join(""))
	const frequencies = frequency(sortedWords)

    return [...frequencies.values()].filter((count) => count > 1).reduce((sum, count) => sum + count, 0)
}
