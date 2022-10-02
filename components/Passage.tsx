import { useContext, Fragment } from 'react'
import { Box } from '@mui/material'
import Image from 'next/future/image'
import { BookViewerContext } from '../context/BookViewerContext'
import { IChapterImage } from '../pages/api/epub'

const Passage = ({
	passage,
	passageIndex,
	chapterIndex,
	chapterImages,
}: {
	passage: string
	passageIndex: number
	chapterIndex: number
	chapterImages: IChapterImage[]
}) => {
	const { fontSize, highlightColor, highlightHoverColor, annotationsAreVisible, imagesAreVisible } =
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
			{passage.split(/\s+/g).map((word, wordIndex) =>
				word.startsWith('@') && word.endsWith('@') ? (
					<Fragment
						key={`chapter-${chapterIndex}-passage-${passageIndex}-image-${wordIndex}-container`}
					>
						{imagesAreVisible && (
							<>
								<Box display="flex" justifyContent="center" alignItems="center" width="100%">
									<Image
										id={`chapter-${chapterIndex}-passage-${passageIndex}-image-${wordIndex}`}
										src={
											chapterImages.find(
												chapterImage => chapterImage.uuid === word.replaceAll('@', ''),
											)?.src || ''
										}
										alt={
											chapterImages.find(
												chapterImage => chapterImage.uuid === word.replaceAll('@', ''),
											)?.alt || ''
										}
										width={10}
										height={10}
										style={{
											width: '25vw',
											height: 'auto',
										}}
									/>
								</Box>
								<br id={`image-line-break-${wordIndex}`} />
							</>
						)}
					</Fragment>
				) : (
					<span
						id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}`}
						key={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}`}
						onMouseEnter={e => handleHover(e, true)}
						onMouseLeave={e => handleHover(e, false)}
						style={{ fontSize: `${fontSize}rem` }}
					>
						{word}{' '}
					</span>
				),
			)}
			<br id={`passage-line-break-${passageIndex}`} />
		</Fragment>
	)
}

export default Passage
