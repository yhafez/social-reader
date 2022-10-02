import { useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import ChapterView from './ChapterView'
import BookNav from './BookNav'
import { BookViewerContext } from '../context/BookViewerContext'

const BookViewer = () => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('sm'))
	const { navIsExpanded, chapters, chapter, setChapter } = useContext(BookViewerContext)

	useEffect(() => {
		const chapter = localStorage.getItem('currentChapter')
		if (chapter) {
			setChapter(JSON.parse(chapter))
		}
	}, [setChapter])

	return (
		<Box
			id="book-viewer-container"
			sx={{
				height: navIsExpanded ? '84%' : '94%',
				'@media screen and (max-width: 800px)': {
					height: navIsExpanded ? '90%' : '93%',
				},
				px: matches ? '1.5rem' : 0,
			}}
			width="100%"
			display="flex"
			alignItems="center"
			flexDirection={matches ? 'column' : 'row'}
		>
			{!matches && <BookNav side="left" epubLength={chapters.length || 0} />}
			{<ChapterView chapter={chapters[chapter]} chapterIndex={chapter} />}
			{!matches && <BookNav side="right" epubLength={chapters.length || 0} />}
			{matches && (
				<Box
					id="book-nav-button-container"
					display="flex"
					justifyContent="space-evenly"
					width="100%"
				>
					<BookNav side="left" epubLength={chapters.length || 0} />
					<BookNav side="right" epubLength={chapters.length || 0} />
				</Box>
			)}
		</Box>
	)
}

export default BookViewer
