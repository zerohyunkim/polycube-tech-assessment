import { marked } from "marked"
import DOMPurify from "dompurify"

const linkSvg =
	/*html*/ `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>`

const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
	if (level > 3) {
		return `<h${level}>${text}</h${level}>`
	}
	const strippedText = text.replace(/<[^>]+>/g, "")
	const anchor = strippedText
		.toLowerCase()
		.replace(/[^\w\u4e00-\u9fff]+/g, "-")

	return /*html*/ `<h${level} id="${anchor}" tabindex="-1"><a href="#${anchor}">${strippedText}${linkSvg}</a></h${level}>`
}

renderer.blockquote = (quote) => {
	const elem = document.createElement("div")
	elem.innerHTML = DOMPurify.sanitize(quote)
	const cleanText = elem.textContent ?? ""

	return /*html*/ `
    <div>
      <blockquote>${quote}</blockquote>
      <button onclick="navigator.clipboard.writeText(\`${
		cleanText.replace(/'/g, "\\'")
	}\`)">복사</button>
    </div>`
}

type Props = { text: string }
export const Renderer = ({ text }: Props) => (
	<article
		dangerouslySetInnerHTML={{
			__html: marked(DOMPurify.sanitize(text), { renderer }),
		}}
	/>
)
