import { useState, useEffect, useRef } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { Box, ClickAwayListener, IconButton, Slider, Tooltip } from '@mui/material'

import useBoundStore from '../../store'

const AdjustVolume = () => {
	const {
		volume,
		setVolume,
		computed: { isDarkMode },
	} = useBoundStore()
	const [isOpen, setIsOpen] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const storedVolume = localStorage.getItem('volume')
		if (storedVolume) setVolume(JSON.parse(storedVolume))
	}, [setVolume])

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
				<ClickAwayListener onClickAway={() => setIsOpen(false)}>
					<Box
						position="absolute"
						left={buttonRef.current?.offsetLeft}
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
							value={Math.round(volume * 100)}
							getAriaValueText={value => `${value}`}
							onChange={(e, value) => {
								e.stopPropagation()
								e.preventDefault()
								setVolume((value as number) / 100)
								localStorage.setItem('volume', JSON.stringify((value as number) / 100))
							}}
							valueLabelDisplay="auto"
							max={100}
							min={0}
						/>
					</Box>
				</ClickAwayListener>
			)}
		</>
	)
}

export default AdjustVolume
