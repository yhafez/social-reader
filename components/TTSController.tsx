import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/material'
import Speech from 'speak-tts'

import Close from './buttons/Close'
import ChangeVoice from './buttons/ChangeVoice'
import AdjustPitch from './buttons/AdjustPitch'
import AdjustVolume from './buttons/AdjustVolume'
import AdjustRate from './buttons/AdjustRate'
import ToggleHighlightSpeech from './buttons/ToggleHighlightSpeech'
import { ThemeContext } from '../context/ThemeContext'
import { BookViewerContext } from '../context/BookViewerContext'
import PlayPause from './buttons/PlayPause'
import Stop from './buttons/Stop'

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

const TTSController = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
	const { isDarkMode } = useContext(ThemeContext)
	const { setSpeech, volume, rate, pitch, voice } = useContext(BookViewerContext)

	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

	useEffect(() => {
		const speech = new Speech()
		if (speech?.hasBrowserSupport()) {
			speech
				.init({
					volume,
					rate,
					pitch,
					voice: voice?.name,
					lang: voice?.lang,
					splitSentences: true,
				})
				.then((data: ISpeechData) => {
					setVoices(data.voices)
					setSpeech(speech)
				})
				.catch((e: Error) =>
					console.error('There was a problem initializing text to speech reader:', e),
				)
		} else {
			console.error('speech synthesis not supported')
		}
	}, [pitch, volume, rate, voice, setSpeech, setVoices])

	return (
		<Box
			display="flex"
			position="absolute"
			right={12}
			bottom={48}
			borderRadius="4px"
			sx={{
				backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
			}}
		>
			<ToggleHighlightSpeech />
			<ChangeVoice voices={voices} />
			<AdjustPitch />
			<AdjustVolume />
			<AdjustRate />
			<PlayPause />
			<Stop />
			<Close name="tts-controller" setIsOpen={setIsOpen} />
		</Box>
	)
}

export default TTSController
