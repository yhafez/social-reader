import { Box } from '@mui/material'

import useBoundStore from '../store'

import ChangeFont from './buttons/ChangeFont'
import ToggleAnnotations from './buttons/ToggleAnnotations'
import Highlight from './buttons/Highlight'
import ColorModeSwitch from './buttons/ColorModeSwitch'
import ThemeColorPicker from './buttons/ThemeColorPicker'
import ToggleImages from './buttons/ToggleImages'
import ToggleTextToSpeech from './buttons/ToggleTextToSpeech'
import ResetSettings from './buttons/ResetSettings'

const BookActionBar = () => {
	const { themeColor } = useBoundStore()

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
					<ToggleTextToSpeech buttonType="toggle" />
					<ChangeFont increase />
					<ChangeFont />
					<ToggleAnnotations />
					<ToggleImages />
					<Highlight buttonType="colorPicker" />
					<ThemeColorPicker />
					<ResetSettings />
				</Box>
			</Box>
		</>
	)
}

export default BookActionBar
