import { useState, useContext, useRef } from 'react'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import { Box, IconButton, Slider, Tooltip } from '@mui/material'

import { BookViewerContext } from '../../context/BookViewerContext'
import { ThemeContext } from '../../context/ThemeContext'

const AdjustPitch = () => {
	const { isDarkMode } = useContext(ThemeContext)
	const { pitch, setPitch } = useContext(BookViewerContext)
	const [isOpen, setIsOpen] = useState(true)
	const buttonRef = useRef<HTMLButtonElement>(null)

	return (
		<>
			<Tooltip id="adjust-pitch-button-tooltip" title="Adjust audio pitch">
				<IconButton
					id="adjust-pitch-button"
					onClick={() => setIsOpen(true)}
					color={isOpen ? 'primary' : 'inherit'}
					ref={buttonRef}
				>
					<GraphicEqIcon id="adjust-pitch-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
			{isOpen && (
				<Box
					position="absolute"
					right={buttonRef.current?.offsetLeft}
					bottom={50}
					py={2}
					borderRadius={2}
					sx={{
						backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
					}}
					height="7rem"
				>
					<Slider
						orientation="vertical"
						aria-label="Rate slider"
						value={pitch}
						getAriaValueText={value => `${value}x`}
						step={0.25}
						onChange={(event, value) => setPitch(value as number)}
						valueLabelDisplay="auto"
						max={3}
						min={0.25}
					/>
				</Box>
			)}
		</>
	)
}

export default AdjustPitch
