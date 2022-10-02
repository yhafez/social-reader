import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/material'
import Speech from 'speak-tts'

import Close from './buttons/Close'
import ChangeVoice from './buttons/ChangeVoice'
import AdjustPitch from './buttons/AdjustPitch'
import AdjustVolume from './buttons/AdjustVolume'
import AdjustRate from './buttons/AdjustRate'
import { ThemeContext } from '../context/ThemeContext'
import Play from './buttons/Play'

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
	const [speech, setSpeech] = useState<any>(null)
	const [volume, setVolume] = useState(1)
	const [rate, setRate] = useState(1)
	const [pitch, setPitch] = useState(1)
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
	const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)

	useEffect(() => {
		const speech = new Speech()
		if (speech.hasBrowserSupport()) {
			setSpeech(speech)
			speech.cancel()
			speech
				.init({
					volume,
					rate,
					pitch,
					voice: voice?.name,
					lang: voice?.lang,
					splitSentences: true,
				})
				.then((data: ISpeechData) => setVoices(data.voices))
				.catch((e: Error) =>
					console.error('There was a problem initializing text to speech reader:', e),
				)
			speech.resume()
		} else {
			console.error('speech synthesis not supported')
		}
	}, [pitch, volume, rate, voice, setVoices])

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
			<ChangeVoice voices={voices} setVoice={setVoice} />
			<AdjustPitch pitch={pitch} setPitch={setPitch} />
			<AdjustVolume volume={volume} setVolume={setVolume} />
			<AdjustRate rate={rate} setRate={setRate} />
			<Play speech={speech} />
			<Close name="tts-controller" setIsOpen={setIsOpen} />
		</Box>
	)
}

export default TTSController
