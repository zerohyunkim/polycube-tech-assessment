import { Component, createRef, forwardRef, TextareaHTMLAttributes } from "react"

import "./App.css"
import { countAnagrams } from "./anagram.js"

export class Editor extends Component {
	private textareaRef = createRef<HTMLTextAreaElement>()
	state = { anagrams: 0 }

	clearText = () => {
		const current = this.textareaRef.current
		if (current) {
			current.value = ""
		}
	}

	countAnagrams() {
		const words = this.textareaRef.current?.value.split(/\s+/) ?? []
		this.setState({ anagrams: countAnagrams(words) })
	}

	render() {
		return (
			<article>
				<h2>애너그램 개수</h2>
				<p>{this.state.anagrams}</p>
				<BaseTextArea ref={this.textareaRef} />
				<section>
					<button onClick={this.clearText}>삭제</button>
					<button onClick={() => this.countAnagrams()}>애너그램 개수 확인</button>
				</section>
			</article>
		)
	}
}

type BaseTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>((props, ref) => {
	// @ts-expect-error: 런타임에도 className가 추가되는 것 방지
	const { className, ...rest } = props
	void className

	return <textarea ref={ref} {...rest} />
})

export const App = () => (
	<>
		<Editor />
	</>
)

export default App
