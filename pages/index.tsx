import { useEffect } from 'react'
import { Box } from '@mui/material'
import axios from 'axios'

import UseBoundStore from '../store'
import BookViewer from '../components/BookViewer'
import Navbar from '../components/Navbar'
import BookActionBar from '../components/BookActionBar'

import { IBook } from '../@types'

const Home = ({ book }: { book: IBook }) => {
	const {
		setBook,
		computed: { isDarkMode },
	} = UseBoundStore()

	useEffect(() => {
		if (book) setBook(book)
	}, [book, setBook])

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
				book: res.data,
			},
		}
	} catch (e) {
		console.error('There was an issue parsing epub: ', e)
		return {}
	}
}

export default Home
