import { assertEquals } from "https://deno.land/std@0.203.0/assert/assert_equals.ts"
import { countAnagrams } from "./web/src/anagram.ts"

Deno.test("애너그램 개수 세기", () => {
	const words = ["abc", "acb", "bac", "foo", "ofo", "zzz", "zxz"]
	const anagrams = countAnagrams(words)
	assertEquals(anagrams, 5)
})
