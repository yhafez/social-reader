import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import useBoundStore from '../store'
import ChapterView from './ChapterView'
import BookNav from './BookNav'

const BookViewer = () => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('sm'))
	const {
		navIsExpanded,
		setChapter,
		computed: { chapters, chapterIndex },
	} = useBoundStore()

	useEffect(() => {
		if (localStorage.getItem('chapterIndex'))
			setChapter(chapters[parseInt(localStorage.getItem('chapterIndex') || '0')])
		else setChapter(chapters && chapters[0])
	}, [chapters, setChapter])

	useEffect(() => {
		if (chapterIndex !== null) localStorage.setItem('chapterIndex', chapterIndex.toString())
	}, [chapters, chapterIndex])

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
			{!matches && <BookNav side="left" epubLength={chapters?.length || 0} />}
			{<ChapterView />}
			{!matches && <BookNav side="right" epubLength={chapters?.length || 0} />}
			{matches && (
				<Box
					id="book-nav-button-container"
					display="flex"
					justifyContent="space-evenly"
					width="100%"
				>
					<BookNav side="left" epubLength={chapters?.length || 0} />
					<BookNav side="right" epubLength={chapters?.length || 0} />
				</Box>
			)}
		</Box>
	)
}

export default BookViewer
