import { useContext } from 'react'
import StopIcon from '@mui/icons-material/Stop'
import { IconButton, Tooltip } from '@mui/material'

import { BookViewerContext } from '../../context/BookViewerContext'

const Stop = () => {
	const { setIsPlaying, speech } = useContext(BookViewerContext)

	const handleStop = () => {
		setIsPlaying(false)
		speech.cancel()
	}

	return (
		<Tooltip id="stop-audio-tooltip" title="Stop/reset text-to-speech">
			<IconButton id="stop-audio-button" color="inherit" onClick={handleStop}>
				<StopIcon id="stop-audio-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default Stop
