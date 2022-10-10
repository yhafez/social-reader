import { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import { Box, ClickAwayListener, IconButton, Tooltip } from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'

import useBoundStore from '../../store'

const ThemeColorPicker = () => {
	const { ttsIsOpen, setTtsIsOpen, themeColor, setThemeColor } = useBoundStore()
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const storedThemeColor = localStorage.getItem('themeColor')
		if (storedThemeColor) setThemeColor(storedThemeColor)
	}, [setThemeColor])

	return (
		<>
			<Tooltip id="theme-color-button-tooltip" title="Change theme color">
				<IconButton
					id="theme-color-button"
					color={isOpen ? 'primary' : 'inherit'}
					sx={{ cursor: 'pointer' }}
					onClick={() => {
						if (ttsIsOpen) setTtsIsOpen(false)
						setIsOpen(true)
					}}
				>
					<ColorLensIcon id="theme-color-icon" />
				</IconButton>
			</Tooltip>
			{isOpen && (
				<ClickAwayListener onClickAway={() => setIsOpen(false)}>
					<Box position="absolute" right={12} bottom={48} sx={{ cursor: 'pointer' }}>
						<SketchPicker
							color={themeColor}
							onChangeComplete={newColor => {
								const { r, g, b, a = 1 } = newColor.rgb
								setThemeColor(`rgba(${r},${g},${b},${a})`)
								localStorage.setItem('themeColor', `rgba(${r},${g},${b},${a})`)
							}}
						/>
					</Box>
				</ClickAwayListener>
			)}
		</>
	)
}

export default ThemeColorPicker
