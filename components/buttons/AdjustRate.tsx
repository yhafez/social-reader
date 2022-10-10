import { useState, useEffect, useRef } from 'react'
import SpeedIcon from '@mui/icons-material/Speed'
import { Box, ClickAwayListener, IconButton, Slider, Tooltip } from '@mui/material'

import useBoundStore from '../../store'

const AdjustRate = () => {
	const {
		rate,
		setRate,
		computed: { isDarkMode },
	} = useBoundStore()
	const [isOpen, setIsOpen] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const storedRate = localStorage.getItem('rate')
		if (storedRate) setRate(JSON.parse(storedRate))
	}, [setRate])

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
							value={rate}
							getAriaValueText={value => `${value}x`}
							step={0.25}
							onChange={(e, value) => {
								e.stopPropagation()
								e.preventDefault()
								setRate(value as number)
								localStorage.setItem('rate', JSON.stringify(value as number))
							}}
							valueLabelDisplay="auto"
							max={4}
							min={0.25}
						/>
					</Box>
				</ClickAwayListener>
			)}
		</>
	)
}

export default AdjustRate
