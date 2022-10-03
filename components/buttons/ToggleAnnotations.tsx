import { useEffect, useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes'

import { BookViewerContext } from '../../context/BookViewerContext'

const ToggleAnnotations = () => {
	const { annotationsAreVisible, setAnnotationsAreVisible } = useContext(BookViewerContext)

	useEffect(() => {
		const storedAnnotationsAreVisible = localStorage.getItem('annotationsAreVisible')
		if (storedAnnotationsAreVisible)
			setAnnotationsAreVisible(JSON.parse(storedAnnotationsAreVisible))
	}, [setAnnotationsAreVisible])

	return (
		<Tooltip id="annotations-toggle-tooltip" title="Toggle annotations">
			<IconButton
				id="display-annotations-button"
				color={annotationsAreVisible ? 'primary' : 'inherit'}
				onClick={() => {
					setAnnotationsAreVisible(annotationsVisible => !annotationsVisible)
					localStorage.setItem('annotationsAreVisible', JSON.stringify(!annotationsAreVisible))
				}}
			>
				<SpeakerNotesIcon id="annotations-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default ToggleAnnotations
