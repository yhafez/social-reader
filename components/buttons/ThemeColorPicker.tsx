import { useState, useContext } from 'react'
import { SketchPicker } from 'react-color'
import { Box, ClickAwayListener, IconButton, Tooltip } from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'

import { ThemeContext } from '../../context/ThemeContext'

const ThemeColorPicker = () => {
	const { themeColor, setThemeColor } = useContext(ThemeContext)
	const [displayThemeColorSelector, setDisplayThemeColorSelector] = useState(false)

	return (
		<>
			<Tooltip id="theme-color-button-tooltip" title="Change theme color">
				<IconButton
					id="theme-color-button"
					color={displayThemeColorSelector ? 'primary' : 'inherit'}
					sx={{ cursor: 'pointer' }}
					onClick={() => setDisplayThemeColorSelector(true)}
				>
					<ColorLensIcon id="theme-color-icon" />
				</IconButton>
			</Tooltip>
			{displayThemeColorSelector && (
				<ClickAwayListener onClickAway={() => setDisplayThemeColorSelector(false)}>
					<Box position="absolute" right={12} bottom={48} sx={{ cursor: 'pointer' }}>
						<SketchPicker
							color={themeColor}
							onChangeComplete={newColor => {
								const { r, g, b, a = 1 } = newColor.rgb
								setThemeColor(`rgba(${r},${g},${b},${a})`)
							}}
						/>
					</Box>
				</ClickAwayListener>
			)}
		</>
	)
}

export default ThemeColorPicker
