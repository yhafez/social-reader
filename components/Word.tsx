import { useContext } from 'react'

import { BookViewerContext } from '../context/BookViewerContext'

const Word = ({
	chapterIndex,
	passageIndex,
	wordIndex,
	word,
}: {
	chapterIndex: number
	passageIndex: number
	wordIndex: number
	word: string
}) => {
	const { fontSize, highlightColor, highlightHoverColor, annotationsAreVisible } =
		useContext(BookViewerContext)

	const handleHover = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		currentlyHovering: boolean,
	) => {
		if (!annotationsAreVisible) return
		const hoveredElement = e.target as HTMLElement

		if (currentlyHovering && hoveredElement.className.includes('-to-')) {
			const querySelector =
				'.' + hoveredElement.className.split(' ').find(className => className.includes('-to-'))

			const highlightedSelectionElements: NodeListOf<HTMLElement> =
				document.querySelectorAll(querySelector)
			highlightedSelectionElements.forEach(element => {
				element.style.backgroundColor = highlightHoverColor
				element.style.cursor = 'pointer'
			})
		} else if (!currentlyHovering && hoveredElement.className.includes('-to-')) {
			const highlightedSelectionElements: NodeListOf<HTMLElement> = document.querySelectorAll(
				'.' + hoveredElement.className.split(' ')[1],
			)
			highlightedSelectionElements.forEach(element => {
				element.style.backgroundColor = highlightColor
				element.style.cursor = 'default'
			})
		}
	}

	return (
		<>
			<span
				id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}`}
				onMouseEnter={e => handleHover(e, true)}
				onMouseLeave={e => handleHover(e, false)}
				style={{
					fontSize: `${fontSize}rem`,
				}}
			>
				{word}
			</span>
		</>
	)
}

export default Word
