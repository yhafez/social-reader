import { useEffect, useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'

import { BookViewerContext } from '../../context/BookViewerContext'

const ChangeFont = ({ increase }: { increase?: boolean }) => {
	const { fontSize, setFontSize } = useContext(BookViewerContext)

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
				disabled={increase ? fontSize >= 4 : fontSize <= 0.5}
				onClick={() => {
					setFontSize(fontSize => (increase ? fontSize * 1.1 : fontSize / 1.1))
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
