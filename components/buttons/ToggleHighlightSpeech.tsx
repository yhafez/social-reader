import { useEffect, useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import HighlightIcon from '@mui/icons-material/Highlight'

import { BookViewerContext } from '../../context/BookViewerContext'

const ToggleHighlightSpeech = () => {
	const { highlightSpeech, setHighlightSpeech } = useContext(BookViewerContext)

	useEffect(() => {
		const storedHighlightSpeech = localStorage.getItem('highlightSpeech')
		if (storedHighlightSpeech) setHighlightSpeech(JSON.parse(storedHighlightSpeech))
	}, [setHighlightSpeech])

	return (
		<Tooltip id="highlight-speech-toggle-tooltip" title="Toggle speech highlighting">
			<IconButton
				id="highlight-speech--toggle-button"
				color={highlightSpeech ? 'primary' : 'inherit'}
				onClick={() => {
					setHighlightSpeech(isOn => !isOn)
					localStorage.setItem('highlightSpeech', JSON.stringify(!highlightSpeech))
				}}
			>
				<HighlightIcon id="highlight-speech-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default ToggleHighlightSpeech
