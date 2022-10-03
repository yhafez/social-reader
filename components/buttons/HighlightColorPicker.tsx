import { useEffect, useContext, useState } from 'react'
import { Box, ClickAwayListener, IconButton, Tooltip } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { BookViewerContext } from '../../context/BookViewerContext'
import { HuePicker } from 'react-color'

const HighlightColorPicker = () => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'))
	const [displayHighlightColorSelector, setDisplayHighlightColorSelector] = useState(false)
	const { highlightColor, setHighlightColor, setHighlightHoverColor } =
		useContext(BookViewerContext)

	useEffect(() => {
		const storedHighlightColor = localStorage.getItem('highlightColor')
		if (storedHighlightColor) setHighlightColor(storedHighlightColor)
	}, [setHighlightColor])

	useEffect(() => {
		const storedHighlightHoverColor = localStorage.getItem('highlightHoverColor')
		if (storedHighlightHoverColor) setHighlightHoverColor(storedHighlightHoverColor)
	}, [setHighlightHoverColor])

	return (
		<>
			<Tooltip id="highlight-color-picker-tooltip" title="Select highlight color">
				<IconButton
					id="highlight-color-picker-button"
					color={displayHighlightColorSelector ? 'primary' : 'inherit'}
					onClick={() => setDisplayHighlightColorSelector(colorPickerIsOpen => !colorPickerIsOpen)}
				>
					<BorderColorIcon id="highlight-color-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
			{displayHighlightColorSelector && (
				<ClickAwayListener onClickAway={() => setDisplayHighlightColorSelector(false)}>
					<Box position="absolute" right={12} bottom={48} sx={{ cursor: 'pointer' }}>
						<HuePicker
							color={highlightColor}
							onChangeComplete={newColor => {
								const { r, g, b, a = 1 } = newColor.rgb
								setHighlightColor(`rgba(${r},${g},${b},${a})`)
								setHighlightHoverColor(`rgba(${r + 50},${g + 50},${b + 50},${a})`)
								localStorage.setItem('highlightColor', `rgba(${r},${g},${b},${a})`)
								localStorage.setItem(
									'highlightHoverColor',
									`rgba(${r + 50},${g + 50},${b + 50},${a})`,
								)
							}}
							width={`${matches ? '250px' : '200px'}`}
						/>
					</Box>
				</ClickAwayListener>
			)}
		</>
	)
}

export default HighlightColorPicker
