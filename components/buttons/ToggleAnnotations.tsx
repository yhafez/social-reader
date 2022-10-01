import { useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes'

import { BookViewerContext } from '../../context/BookViewerContext'

const ToggleAnnotations = () => {
	const { annotationsAreVisible, setAnnotationsAreVisible } = useContext(BookViewerContext)

	return (
		<Tooltip id="annotations-toggle-tooltip" title="Toggle annotations">
			<IconButton
				id="display-annotations-button"
				color={annotationsAreVisible ? 'primary' : 'inherit'}
				onClick={() => setAnnotationsAreVisible(annotationsVisible => !annotationsVisible)}
			>
				<SpeakerNotesIcon id="annotations-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default ToggleAnnotations
