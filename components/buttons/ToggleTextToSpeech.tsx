import { useEffect, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'

import TTSController from '../TTSController'

const TextToSpeechToggle = () => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const storedIsOpen = localStorage.getItem('ttsIsOpen')
		if (storedIsOpen) setIsOpen(JSON.parse(storedIsOpen))
	}, [])

	return (
		<>
			<Tooltip id="text-to-speech-button-tooltip" title="Text-to-Speech">
				<IconButton
					id="text-to-speech-button"
					onClick={() => {
						localStorage.setItem('ttsIsOpen', JSON.stringify(!isOpen))
						setIsOpen(open => !open)
					}}
					color={isOpen ? 'primary' : 'inherit'}
				>
					<CampaignIcon id="voices-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
			{isOpen && <TTSController setIsOpen={setIsOpen} />}
		</>
	)
}

export default TextToSpeechToggle
