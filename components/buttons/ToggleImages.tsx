import { useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'

import { BookViewerContext } from '../../context/BookViewerContext'

const ToggleImages = () => {
	const { imagesAreVisible, setImagesAreVisible } = useContext(BookViewerContext)

	return (
		<Tooltip id="toggle-image-button-tooltip" title="Toggle image visibility">
			<IconButton
				id="toggle-image-button"
				onClick={() => setImagesAreVisible(visible => !visible)}
				color={imagesAreVisible ? 'primary' : 'inherit'}
			>
				<ImageIcon id="text-to-speech-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default ToggleImages
