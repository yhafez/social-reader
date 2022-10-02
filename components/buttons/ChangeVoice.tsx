import { useContext, useState } from 'react'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'

import { BookViewerContext } from '../../context/BookViewerContext'

const ChangeVoice = () => {
	const { voices, setVoice } = useContext(BookViewerContext)
	const [displayVoices, setDisplayVoices] = useState(false)
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setDisplayVoices(true)
		setAnchorEl(e.currentTarget)
	}
	const handleClose = (e: React.MouseEvent, voice?: SpeechSynthesisVoice) => {
		setDisplayVoices(false)
		setAnchorEl(null)
		if (voice) setVoice(voice)
	}

	return (
		<>
			<Tooltip id="voices-button-tooltip" title="Change reader voice">
				<IconButton
					id="voices-button"
					onClick={handleClick}
					color={displayVoices ? 'primary' : 'inherit'}
				>
					<RecordVoiceOverIcon id="voices-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
			{displayVoices && (
				<Menu
					id="voices-list-menu"
					anchorEl={anchorEl}
					open={displayVoices}
					onClose={() => {
						setDisplayVoices(false)
						setAnchorEl(null)
					}}
					MenuListProps={{
						'aria-labelledby': 'voices-button',
					}}
					PaperProps={{
						style: {
							maxHeight: 400,
						},
					}}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				>
					{voices.map(voice => (
						<MenuItem onClick={e => handleClose(e, voice)} key={voice.name}>
							{voice.name} | {voice.lang}
						</MenuItem>
					))}
				</Menu>
			)}
		</>
	)
}

export default ChangeVoice
