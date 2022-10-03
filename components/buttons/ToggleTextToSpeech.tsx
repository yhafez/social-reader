import { useEffect, useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'

import TTSController from '../TTSController'
import { BookViewerContext } from '../../context/BookViewerContext'

const TextToSpeechToggle = () => {
	const { ttsIsOpen, setTtsIsOpen } = useContext(BookViewerContext)

	useEffect(() => {
		const storedTTSIsOpen = localStorage.getItem('ttsIsOpen')
		if (storedTTSIsOpen) setTtsIsOpen(JSON.parse(storedTTSIsOpen))
	}, [setTtsIsOpen])

	return (
		<>
			<Tooltip id="text-to-speech-button-tooltip" title="Text-to-Speech">
				<IconButton
					id="text-to-speech-button"
					onClick={() => {
						localStorage.setItem('ttsIsOpen', JSON.stringify(!ttsIsOpen))
						setTtsIsOpen(open => !open)
					}}
					color={ttsIsOpen ? 'primary' : 'inherit'}
				>
					<CampaignIcon id="voices-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
			{ttsIsOpen && <TTSController setIsOpen={setTtsIsOpen} />}
		</>
	)
}

export default TextToSpeechToggle
