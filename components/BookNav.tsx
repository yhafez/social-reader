import { useEffect, useCallback } from 'react'
import { Box } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import useBoundStore from '../store'
import { IBookNav } from '../@types'

const BookNav = ({ side, epubLength }: IBookNav) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('sm'))
	const {
		setChapter,
		computed: { chapters, chapterIndex, isDarkMode },
	} = useBoundStore()

	const handleChapterChange = useCallback(
		(direction: 'next' | 'prev') => {
			if (direction === 'next') {
				if (chapterIndex < epubLength - 1) {
					setChapter(chapters[chapterIndex + 1])
				}
			} else {
				if (chapterIndex > 0) {
					setChapter(chapters[chapterIndex - 1])
				}
			}
		},
		[chapterIndex, epubLength, setChapter, chapters],
	)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') {
				handleChapterChange('next')
			} else if (e.key === 'ArrowLeft') {
				handleChapterChange('prev')
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleChapterChange])

	useEffect(() => {
		const handleTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0]
			const startX = touch.clientX
			const startY = touch.clientY

			const handleTouchMove = (e: TouchEvent) => {
				const touch = e.touches[0]
				const endX = touch.clientX
				const endY = touch.clientY

				const deltaX = endX - startX
				const deltaY = endY - startY

				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					if (deltaX > 0) {
						handleChapterChange('prev')
					} else {
						handleChapterChange('next')
					}
				}
			}

			window.addEventListener('touchmove', handleTouchMove)

			return () => {
				window.removeEventListener('touchmove', handleTouchMove)
			}
		}

		window.addEventListener('touchstart', handleTouchStart)

		return () => {
			window.removeEventListener('touchstart', handleTouchStart)
		}
	}, [handleChapterChange])

	useEffect(() => {
		const handleSwipe = (e: any) => {
			if (e.detail.direction === 'left') {
				handleChapterChange('next')
			} else if (e.detail.direction === 'right') {
				handleChapterChange('prev')
			}
		}

		window.addEventListener('swiped', handleSwipe)

		return () => {
			window.removeEventListener('swiped', handleSwipe)
		}
	}, [handleChapterChange])

	const boxStyles =
		(side === 'left' && chapterIndex !== 0) || (side === 'right' && chapterIndex !== epubLength - 1)
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
			onClick={() => handleChapterChange(side === 'left' ? 'prev' : 'next')}
		>
			{side === 'left' ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
		</Box>
	)
}

export default BookNav
