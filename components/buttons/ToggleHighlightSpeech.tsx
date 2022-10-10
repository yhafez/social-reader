import { useEffect } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import HighlightIcon from '@mui/icons-material/Highlight'

import useBoundStore from '../../store'

const ToggleHighlightSpeech = () => {
	const { highlightTtsSpeech, setHighlightTtsSpeech, toggleHighlightTtsSpeech } = useBoundStore()

	useEffect(() => {
		const storedHighlightSpeech = localStorage.getItem('highlightSpeech')
		if (storedHighlightSpeech) setHighlightTtsSpeech(JSON.parse(storedHighlightSpeech))
	}, [setHighlightTtsSpeech])

	return (
		<Tooltip id="highlight-speech-toggle-tooltip" title="Toggle speech highlighting">
			<IconButton
				id="highlight-speech--toggle-button"
				color={highlightTtsSpeech ? 'primary' : 'inherit'}
				onClick={() => {
					toggleHighlightTtsSpeech()
					localStorage.setItem('highlightSpeech', JSON.stringify(!highlightTtsSpeech))
				}}
			>
				<HighlightIcon id="highlight-speech-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default ToggleHighlightSpeech
