import { useContext } from 'react'
import { Box } from '@mui/material'

import ChangeFont from './buttons/ChangeFont'
import ToggleAnnotations from './buttons/ToggleAnnotations'
import HighlightColorPicker from './buttons/HighlightColorPicker'
import ChangeVoice from './buttons/ChangeVoice'
import ColorModeSwitch from './buttons/ColorModeSwitch'
import ThemeColorPicker from './buttons/ThemeColorPicker'

import { ThemeContext } from '../context/ThemeContext'
import TextToSpeechToggle from './buttons/TextToSpeechToggle'

const BookActionBar = () => {
	const { themeColor } = useContext(ThemeContext)

	return (
		<>
			<Box
				id="book-action-bar-container"
				display="flex"
				justifyContent="flex-end"
				width="100%"
				position="sticky"
				borderRadius="4px 4px 0 0"
				bottom="0"
				sx={{ backgroundColor: themeColor }}
			>
				<Box
					id="book-action-bar-right-buttons-container"
					display="flex"
					justifyContent="flex-start"
					width="100%"
					ml={1}
				>
					<ColorModeSwitch />
				</Box>
				<Box
					id="book-action-bar-right-buttons-container"
					display="flex"
					justifyContent="flex-end"
					width="100%"
					mr={1}
				>
					<TextToSpeechToggle />
					<ChangeVoice />
					<ChangeFont increase />
					<ChangeFont />
					<ToggleAnnotations />
					<HighlightColorPicker />
					<ThemeColorPicker />
				</Box>
			</Box>
		</>
	)
}

export default BookActionBar
