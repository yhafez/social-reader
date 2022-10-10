import { useState, useEffect, useRef } from 'react'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import { Box, ClickAwayListener, IconButton, Slider, Tooltip } from '@mui/material'

import useBoundStore from '../../store'

const AdjustPitch = () => {
	const {
		pitch,
		setPitch,
		computed: { isDarkMode },
	} = useBoundStore()

	const [isOpen, setIsOpen] = useState(false)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const storedPitch = localStorage.getItem('pitch')
		if (storedPitch) setPitch(JSON.parse(storedPitch))
	}, [setPitch])

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
							value={pitch}
							getAriaValueText={value => `${value}x`}
							step={0.25}
							onChange={(e, value) => {
								e.stopPropagation()
								e.preventDefault()
								setPitch(value as number)
								localStorage.setItem('pitch', JSON.stringify(value as number))
							}}
							valueLabelDisplay="auto"
							max={2}
							min={0.25}
						/>
					</Box>
				</ClickAwayListener>
			)}
		</>
	)
}

export default AdjustPitch
