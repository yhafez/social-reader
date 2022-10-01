import { useState, useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Speech from 'speak-tts'

import { IChapters } from '../pages/index'
import ChapterView from './ChapterView'
import BookNav from './BookNav'
import { BookViewerContext } from '../context/BookViewerContext'

export interface ISpeechData {
	browserSupport: boolean
	lang: string
	pitch: number
	rate: number
	splitSentences: boolean
	voice: SpeechSynthesisVoice
	voices: SpeechSynthesisVoice[]
	volume: number
}

const BookViewer = ({ chapters }: IChapters) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('sm'))
	const { navIsExpanded, setVoices, voice } = useContext(BookViewerContext)
	const [currentChapter, setCurrentChapter] = useState(0)
	const [speech, setSpeech] = useState(null)

	useEffect(() => {
		const chapter = localStorage.getItem('currentChapter')
		if (chapter) {
			setCurrentChapter(JSON.parse(chapter))
		}
	}, [])

	useEffect(() => {
		const speech = new Speech()
		if (speech.hasBrowserSupport()) {
			setSpeech(speech)
			speech
				.init({
					volume: 1,
					lang: voice?.lang,
					rate: 1,
					pitch: 1,
					voice: voice?.name,
					splitSentences: true,
				})
				.then((data: ISpeechData) => setVoices(data.voices))
				.catch((e: Error) =>
					console.error('There was a problem initializing text to speech reader', e),
				)
		} else {
			console.error('speech synthesis not supported')
		}
	}, [setVoices, voice])

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
			{!matches && (
				<BookNav
					setCurrentChapter={setCurrentChapter}
					side="left"
					epubLength={chapters.length || 0}
					currentChapter={currentChapter}
				/>
			)}
			{<ChapterView chapter={chapters[currentChapter]} chapterIndex={currentChapter} />}
			{!matches && (
				<BookNav
					setCurrentChapter={setCurrentChapter}
					side="right"
					epubLength={chapters.length || 0}
					currentChapter={currentChapter}
				/>
			)}
			{matches && (
				<Box
					id="book-nav-button-container"
					display="flex"
					justifyContent="space-evenly"
					width="100%"
				>
					<BookNav
						setCurrentChapter={setCurrentChapter}
						side="left"
						epubLength={chapters.length || 0}
						currentChapter={currentChapter}
					/>
					<BookNav
						setCurrentChapter={setCurrentChapter}
						side="right"
						epubLength={chapters.length || 0}
						currentChapter={currentChapter}
					/>
				</Box>
			)}
		</Box>
	)
}

export default BookViewer
