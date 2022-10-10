import { useEffect } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes'

import useBoundStore from '../../store'

const ToggleAnnotations = () => {
	const { annotationsAreVisible, toggleAnnotationsAreVisible, setAnnotationsAreVisible } =
		useBoundStore()

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
					toggleAnnotationsAreVisible()
					localStorage.setItem('annotationsAreVisible', JSON.stringify(!annotationsAreVisible))
				}}
			>
				<SpeakerNotesIcon id="annotations-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default ToggleAnnotations
