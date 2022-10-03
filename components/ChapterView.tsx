import React, { useContext } from 'react'
import { Box } from '@mui/material'

import Passage from './Passage'
import { BookViewerContext } from '../context/BookViewerContext'
export interface IBookSelection extends Range {
	id: string
}

const ChapterView = () => {
	const { chapters, chapter } = useContext(BookViewerContext)
	const chapterText = chapters[chapter]?.text

	const passages = chapterText?.split('\n\n')

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
				/>
			))}
		</Box>
	)
}

export default ChapterView
