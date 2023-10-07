import { Component, createRef, forwardRef, TextareaHTMLAttributes } from "react"
import { countAnagrams } from "./anagram.js"
import { Renderer } from "./Renderer.js"

const defaultText = /*md*/ `
# H1 헤딩

## H2 헤딩

### [H3 헤딩](http://www.example.com/)

#### H4 헤딩

> 블록 인용문
>
> 여러줄 가능,
> 복사 가능

텍스트 내용
`

export class Editor extends Component {
	private textareaRef = createRef<HTMLTextAreaElement>()
	state = { anagrams: 0, text: defaultText }

	clearText = () => this.setState({ text: "" })

	countAnagrams = () => {
		const words = this.state.text.split(/\s+/)
		this.setState({ anagrams: countAnagrams(words) })
	}

	handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		this.setState({ text: e.target.value })

	render() {
		return (
			<>
				<section>
					<h2>프리뷰</h2>
					<Renderer text={this.state.text} />
				</section>
				<section>
					<h2>에디터</h2>
					<p>애너그램 개수: {this.state.anagrams}</p>
					<BaseTextArea
						ref={this.textareaRef}
						value={this.state.text}
						onChange={this.handleTextareaChange}
					/>
					<fieldset>
						<button onClick={this.clearText}>삭제</button>
						<button onClick={this.countAnagrams}>애너그램 개수 확인</button>
					</fieldset>
				</section>
			</>
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
