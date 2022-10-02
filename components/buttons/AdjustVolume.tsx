import { useState, useContext, useRef } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { Box, IconButton, Slider, Tooltip } from '@mui/material'

import { BookViewerContext } from '../../context/BookViewerContext'
import { ThemeContext } from '../../context/ThemeContext'

const AdjustVolume = () => {
	const { isDarkMode } = useContext(ThemeContext)
	const { volume, setVolume } = useContext(BookViewerContext)
	const [isOpen, setIsOpen] = useState(true)
	const buttonRef = useRef<HTMLButtonElement>(null)

	return (
		<>
			<Tooltip id="adjust-volume-button-tooltip" title="Adjust audio volume">
				<IconButton
					id="adjust-volume-button"
					onClick={() => setIsOpen(true)}
					color={isOpen ? 'primary' : 'inherit'}
					ref={buttonRef}
				>
					{volume > 0 ? (
						<VolumeUpIcon id="adjust-volume-icon" sx={{ cursor: 'pointer' }} />
					) : (
						<VolumeOffIcon id="adjust-volume-icon" sx={{ cursor: 'pointer' }} />
					)}
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
						value={volume}
						getAriaValueText={value => `${value}x`}
						onChange={(event, value) => setVolume(value as number)}
						valueLabelDisplay="auto"
						max={100}
						min={0}
					/>
				</Box>
			)}
		</>
	)
}

export default AdjustVolume
