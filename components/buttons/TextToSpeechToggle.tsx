import { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'

const TextToSpeechToggle = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Tooltip id="text-to-speech-button-tooltip" title="Text-to-Speech">
				<IconButton
					id="text-to-speech-button"
					onClick={() => setIsOpen(true)}
					color={isOpen ? 'primary' : 'inherit'}
				>
					<CampaignIcon id="voices-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
		</>
	)
}

export default TextToSpeechToggle
