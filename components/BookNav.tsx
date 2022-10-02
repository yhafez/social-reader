import { useContext, Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ThemeContext } from '../context/ThemeContext'
import { BookViewerContext } from '../context/BookViewerContext'

export interface IBookNav {
	side: 'left' | 'right'
	epubLength: number
}

const BookNav = ({ side, epubLength }: IBookNav) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('sm'))
	const { isDarkMode } = useContext(ThemeContext)
	const { chapter, setChapter } = useContext(BookViewerContext)

	const boxStyles =
		(side === 'left' && chapter !== 0) || (side === 'right' && chapter !== epubLength - 1)
			? {
					cursor: 'pointer',
					width: matches ? '100%' : 'auto',
					'&:hover': {
						backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0 , 0, 0.2)',
					},
			  }
			: { cursor: 'not-allowed', width: matches ? '100%' : 'auto' }

	return (
		<Box
			height={matches ? '100%' : '90%'}
			display="flex"
			justifyContent="center"
			alignItems="center"
			borderRadius={2}
			mt={2}
			mr={side === 'left' && !matches ? 2 : 0}
			ml={side === 'right' && !matches ? 2 : 0}
			px={matches ? 0 : 1}
			sx={boxStyles}
			onClick={() =>
				setChapter(chapter => {
					if (side === 'left') {
						if (chapter !== 0) {
							localStorage.setItem('currentChapter', JSON.stringify(chapter - 1))
							return chapter - 1
						} else {
							localStorage.setItem('currentChapter', JSON.stringify(0))
							return 0
						}
					} else {
						if (chapter !== epubLength - 1) {
							localStorage.setItem('currentChapter', JSON.stringify(chapter + 1))
							return chapter + 1
						} else {
							localStorage.setItem('currentChapter', JSON.stringify(epubLength - 1))
							return epubLength - 1
						}
					}
				})
			}
		>
			{side === 'left' ? (
				<ArrowBackIosNewIcon sx={{ color: 'gray' }} />
			) : (
				<ArrowForwardIosIcon sx={{ color: 'gray' }} />
			)}
		</Box>
	)
}

export default BookNav
