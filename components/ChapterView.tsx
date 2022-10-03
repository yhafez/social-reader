import React, { useState, useEffect, useContext, MouseEvent } from 'react'
import { Box } from '@mui/material'

import Passage from './Passage'
import { handleHighlight, processHighlightText } from '../utils/helpers'
import { BookViewerContext } from '../context/BookViewerContext'
export interface IBookSelection extends Range {
	id: string
}

const ChapterView = () => {
	const { annotationsAreVisible, highlightColor, highlightHoverColor, chapters, chapter } =
		useContext(BookViewerContext)
	const [ranges, setRanges] = useState<IBookSelection[]>([])
	const [selectedRange, setSelectedRange] = useState<IBookSelection | null>(null)
	const chapterText = chapters[chapter]?.text

	useEffect(() => {
		ranges.forEach(range => {
			if (range?.id === selectedRange?.id) {
				handleHighlight(
					range?.startContainer,
					range?.endContainer,
					annotationsAreVisible,
					highlightHoverColor,
					true,
				)
			} else {
				handleHighlight(
					range?.startContainer,
					range?.endContainer,
					annotationsAreVisible,
					highlightColor,
				)
			}
		})
	}, [ranges, annotationsAreVisible, highlightColor, selectedRange, highlightHoverColor])

	const passages = chapterText?.split('\n\n')

	const handleSelection = () => {
		const selObj = window.getSelection() || new Selection()
		const rangeObj = selObj?.getRangeAt(0) as IBookSelection

		if (
			rangeObj &&
			rangeObj?.startContainer?.nodeName === '#text' &&
			rangeObj?.endContainer?.nodeName === '#text' &&
			rangeObj?.startContainer?.parentElement &&
			rangeObj?.endContainer?.parentElement
		) {
			rangeObj.id = `${rangeObj.startContainer.parentElement.id}-to-${rangeObj.endContainer.parentElement.id}`
			setRanges([...ranges, rangeObj])
			setSelectedRange(rangeObj)
		}
	}

	if (chapterText?.startsWith('<?xml'))
		return (
			<Box
				id={`chapter-${chapter}-container`}
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
					__html: chapterText.slice(
						chapterText.indexOf('<body'),
						chapterText.indexOf('</body>') + 7,
					),
				}}
			/>
		)

	return (
		<Box
			id={`chapter-${chapter}-container`}
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
					key={`passage-${passageIndex}-container`}
					chapterImages={chapters[chapter]?.images}
					passage={passage}
					passageIndex={passageIndex}
					chapterIndex={chapter}
					selectedRange={selectedRange}
					setRanges={setRanges}
				/>
			))}
		</Box>
	)
}

export default ChapterView
