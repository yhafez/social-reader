import { useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import HighlightIcon from '@mui/icons-material/Highlight'

import { BookViewerContext } from '../../context/BookViewerContext'

const ToggleHighlightSpeech = () => {
	const { highlightSpeech, setHighlightSpeech } = useContext(BookViewerContext)

	return (
		<Tooltip id="highlight-speech-toggle-tooltip" title="Toggle speech highlighting">
			<IconButton
				id="highlight-speech--toggle-button"
				color={highlightSpeech ? 'primary' : 'inherit'}
				onClick={() => setHighlightSpeech(isOn => !isOn)}
			>
				<HighlightIcon id="highlight-speech-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default ToggleHighlightSpeech
