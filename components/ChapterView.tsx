import { useState, useEffect, useContext } from 'react'
import { Box } from '@mui/material'

import Passage from './Passage'
import { highlightText } from '../utils/helpers'
import { BookViewerContext } from '../context/BookViewerContext'
import { IParsedChapter } from '../pages/api/epub'
export interface IBookSelection extends Range {
	id: string
}

const ChapterView = ({
	chapter,
	chapterIndex,
}: {
	chapter: IParsedChapter
	chapterIndex: number
}) => {
	const { annotationsAreVisible, highlightColor } = useContext(BookViewerContext)
	const [ranges, setRanges] = useState<Range[]>([])

	useEffect(() => {
		ranges.map(range => {
			if (
				range.startContainer &&
				range.endContainer &&
				range.startContainer.parentElement &&
				range.endContainer.parentElement
			) {
				const key = `${range.startContainer.parentElement.id}-to-${range.endContainer.parentElement.id}`
				if (annotationsAreVisible)
					highlightText(
						range.startContainer.parentElement,
						range.endContainer.parentElement,
						key,
						highlightColor,
					)
				else
					(document.querySelectorAll(`.${key}`) as NodeListOf<HTMLElement>).forEach(
						element => (element.style.backgroundColor = 'transparent'),
					)
			}
		})
	}, [ranges, annotationsAreVisible, highlightColor])

	const passages = chapter?.text?.split('\n\n')

	const handleSelection = () => {
		const selObj = window.getSelection() || new Selection()
		const rangeObj = selObj.getRangeAt(0) as IBookSelection

		if (
			rangeObj &&
			rangeObj?.startContainer?.nodeName === '#text' &&
			rangeObj?.endContainer?.nodeName === '#text' &&
			rangeObj?.startContainer?.parentElement &&
			rangeObj?.endContainer?.parentElement
		) {
			rangeObj.id = `${rangeObj.startContainer.parentElement.id}-to-${rangeObj.endContainer.parentElement.id}`
			setRanges([...ranges, rangeObj])
		}
	}

	if (chapter?.text?.startsWith('<?xml'))
		return (
			<Box
				id={`chapter-${chapterIndex}-container`}
				height="100%"
				width="100%"
				position="relative"
				overflow="scroll"
				display="flex"
				justifyContent="center"
				sx={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}
				dangerouslySetInnerHTML={{
					__html: chapter.text.slice(
						chapter.text.indexOf('<body'),
						chapter.text.indexOf('</body>') + 7,
					),
				}}
			/>
		)

	return (
		<Box
			id={`chapter-${chapterIndex}-container`}
			height="100%"
			width="100%"
			position="relative"
			overflow="scroll"
			onMouseUp={handleSelection}
			sx={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				msOverflowStyle: 'none',
				scrollbarWidth: 'none',
			}}
		>
			{passages?.map((passage, passageIndex) => (
				<Passage
					chapterImages={chapter.images}
					key={`passage-${passageIndex}-container`}
					passage={passage}
					passageIndex={passageIndex}
					chapterIndex={chapterIndex}
				/>
			))}
		</Box>
	)
}

export default ChapterView
