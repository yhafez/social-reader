import { useEffect, useContext, useState } from 'react'
import { Box, ClickAwayListener, IconButton, Tooltip } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { BookViewerContext } from '../../context/BookViewerContext'
import { SliderPicker, AlphaPicker } from 'react-color'

const Highlight = ({
	buttonType,
	handleClosePopOver,
	style,
	iconProps,
}: {
	buttonType: 'colorPicker' | 'highlight'
	handleClosePopOver?: (highlightSelection: boolean) => void
	style?: { [key: string]: any }
	iconProps?: { [key: string]: any }
}) => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'))
	const [isOpen, setIsOpen] = useState(false)
	const { highlightColor, setHighlightColor, setHighlightHoverColor, ttsIsOpen, setTtsIsOpen } =
		useContext(BookViewerContext)

	useEffect(() => {
		const storedHighlightColor = localStorage.getItem('highlightColor')
		if (storedHighlightColor) setHighlightColor(storedHighlightColor)
	}, [setHighlightColor])

	useEffect(() => {
		const storedHighlightHoverColor = localStorage.getItem('highlightHoverColor')
		if (storedHighlightHoverColor) setHighlightHoverColor(storedHighlightHoverColor)
	}, [setHighlightHoverColor])

	const handleClick = () => {
		if (buttonType === 'colorPicker') {
			if (ttsIsOpen) setTtsIsOpen(false)
			setIsOpen(true)
		} else handleClosePopOver && handleClosePopOver(true)
	}

	return (
		<>
			<Tooltip
				id={
					buttonType === 'colorPicker'
						? 'highlight-color-picker-tooltip'
						: 'highlight-selection-tooltip'
				}
				title={buttonType === 'colorPicker' ? 'Select highlight color' : 'Highlight selection'}
			>
				<IconButton
					id={
						buttonType === 'colorPicker'
							? 'highlight-color-picker-button'
							: 'highlight-selection-button'
					}
					color={iconProps?.color ? iconProps.color : isOpen ? 'primary' : 'inherit'}
					onClick={handleClick}
					sx={{ ...style }}
					size={iconProps?.size}
				>
					<BorderColorIcon id="highlight-color-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
			{isOpen && buttonType === 'colorPicker' && (
				<ClickAwayListener onClickAway={() => setIsOpen(false)}>
					<Box
						width={matches ? '250px' : '200px'}
						position="absolute"
						right={12}
						bottom={48}
						sx={{ cursor: 'pointer' }}
					>
						<SliderPicker
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
						/>
						<Box height={16} />
						<AlphaPicker
							width={matches ? '250px' : '200px'}
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
						/>
					</Box>
				</ClickAwayListener>
			)}
		</>
	)
}

export default Highlight
