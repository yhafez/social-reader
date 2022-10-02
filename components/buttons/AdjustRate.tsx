import { useState, useContext, useRef } from 'react'
import SpeedIcon from '@mui/icons-material/Speed'
import { Box, IconButton, Slider, Tooltip } from '@mui/material'

import { BookViewerContext } from '../../context/BookViewerContext'
import { ThemeContext } from '../../context/ThemeContext'

const AdjustRate = () => {
	const { isDarkMode } = useContext(ThemeContext)
	const { rate, setRate } = useContext(BookViewerContext)
	const [isOpen, setIsOpen] = useState(true)
	const buttonRef = useRef<HTMLButtonElement>(null)

	return (
		<>
			<Tooltip id="adjust-rate-button-tooltip" title="Adjust audio rate">
				<IconButton
					id="adjust-rate-button"
					onClick={() => setIsOpen(true)}
					color={isOpen ? 'primary' : 'inherit'}
					ref={buttonRef}
				>
					<SpeedIcon id="adjust-rate-icon" sx={{ cursor: 'pointer' }} />
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
						value={rate}
						getAriaValueText={value => `${value}x`}
						step={0.25}
						onChange={(event, value) => setRate(value as number)}
						valueLabelDisplay="auto"
						max={3}
						min={0.25}
					/>
				</Box>
			)}
		</>
	)
}

export default AdjustRate
