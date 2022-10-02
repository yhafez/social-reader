import { useEffect, useContext } from 'react'
import { Box } from '@mui/material'

import BookViewer from '../components/BookViewer'
import Navbar from '../components/Navbar'
import BookActionBar from '../components/BookActionBar'
import axios from 'axios'
import { ThemeContext } from '../context/ThemeContext'
import { IParsedChapter } from './api/epub'
import { BookViewerContext } from '../context/BookViewerContext'

export interface IChapters {
	chapters: IParsedChapter[]
}

const Home = ({ chapters }: IChapters) => {
	const { isDarkMode, setColorMode } = useContext(ThemeContext)
	const { setChapters } = useContext(BookViewerContext)

	useEffect(() => {
		if (chapters) setChapters(chapters)
		if (localStorage.getItem('colorMode') === 'dark') {
			setColorMode('dark')
		} else if (localStorage.getItem('colorMode') === 'light') {
			setColorMode('light')
		}
	}, [setColorMode, setChapters, chapters])

	return (
		<Box
			id="app"
			className="app"
			position="absolute"
			top="0"
			left="0"
			right="0"
			bottom="0"
			height="100vh"
			width="100vw"
			color={isDarkMode ? 'white' : 'black'}
			sx={{ backgroundColor: isDarkMode ? '#242424' : 'white' }}
		>
			<Navbar />
			<BookViewer />
			<BookActionBar />
		</Box>
	)
}

export const getServerSideProps = async () => {
	try {
		const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/epub`)

		return {
			props: {
				chapters: res.data.chapters,
			},
		}
	} catch (e) {
		console.error('There was an issue parsing epub: ', e)
		return {}
	}
}

export default Home
