import { useEffect } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'

import useBoundStore from '../../store'

const ChangeFont = ({ increase }: { increase?: boolean }) => {
	const { fontSize, setFontSize, increaseFontSize, decreaseFontSize } = useBoundStore()

	useEffect(() => {
		const storedFontSize = localStorage.getItem('fontSize')
		if (storedFontSize) setFontSize(JSON.parse(storedFontSize))
	}, [setFontSize])

	return (
		<Tooltip
			id={`${increase ? 'increase' : 'decrease'}-font-tooltip`}
			title={`${increase ? 'Increase' : 'Decrease'} font size`}
		>
			<IconButton
				id={`${increase ? 'increase' : 'decrease'}-font-size-button`}
				color="inherit"
				disabled={increase ? fontSize >= 48 : fontSize <= 8}
				onClick={() => {
					increase ? increaseFontSize() : decreaseFontSize()
					localStorage.setItem('fontSize', JSON.stringify(fontSize))
				}}
			>
				{increase ? (
					<TextIncreaseIcon sx={{ cursor: 'pointer' }} />
				) : (
					<TextDecreaseIcon sx={{ cursor: 'pointer' }} />
				)}
			</IconButton>
		</Tooltip>
	)
}

export default ChangeFont
