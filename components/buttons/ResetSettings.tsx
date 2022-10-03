import { useContext } from 'react'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { IconButton, Tooltip } from '@mui/material'

import { BookViewerContext } from '../../context/BookViewerContext'

const Stop = () => {
	// const {} = useContext(BookViewerContext)

	const handleResetSettings = () => {
		localStorage.removeItem('pitch')
		localStorage.removeItem('rate')
		localStorage.removeItem('volume')
		localStorage.removeItem('voice')
		localStorage.removeItem('imagesAreVisible')
		localStorage.removeItem('annotationsAreVisible')
		localStorage.removeItem('fontSize')
		localStorage.removeItem('colorMode')
		localStorage.removeItem('highlightColor')
		localStorage.removeItem('highlightHoverColor')
		localStorage.removeItem('themeColor')
		localStorage.removeItem('highlightSpeech')
		window.location.reload()
	}

	return (
		<Tooltip id="reset-settings-tooltip" title="Reset all settings to default">
			<IconButton id="reset-settings-button" color="inherit" onClick={handleResetSettings}>
				<RestartAltIcon id="reset-settings-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default Stop
