import { useState } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'
import { useDrag } from 'react-dnd'

const TextToSpeechToggle = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [{ opacity }, dragRef] = useDrag(
		() => ({
			type: 'modal',
			collect: monitor => ({
				opacity: monitor.isDragging() ? 0.5 : 1,
			}),
		}),
		[],
	)

	return (
		<>
			<Tooltip id="text-to-speech-button-tooltip" title="Text-to-Speech">
				<IconButton
					id="text-to-speech-button"
					onClick={() => setIsOpen(true)}
					color={isOpen ? 'primary' : 'inherit'}
				>
					<CampaignIcon id="text-to-speech-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>

			{isOpen && (
				<Box
					ref={dragRef}
					sx={{ opacity, width: '500px', height: '500px', backgroundColor: 'black' }}
				>
					<p></p>
				</Box>
			)}
		</>
	)
}

export default TextToSpeechToggle
