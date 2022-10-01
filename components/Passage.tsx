import { useContext, Fragment } from 'react'
import { BookViewerContext } from '../context/BookViewerContext'

const Passage = ({
	passage,
	passageIndex,
	chapterIndex,
}: {
	passage: string
	passageIndex: number
	chapterIndex: number
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
		<Fragment>
			{passage.split(' ').map((word, wordIndex) => (
				<span
					id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}`}
					key={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}`}
					onMouseEnter={e => handleHover(e, true)}
					onMouseLeave={e => handleHover(e, false)}
					style={{ fontSize: `${fontSize}rem` }}
				>
					{word}{' '}
				</span>
			))}
			<br id={`line-break-${passageIndex}`} />
		</Fragment>
	)
}

export default Passage
