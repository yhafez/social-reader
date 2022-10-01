import { useContext } from 'react'
import { Switch, Tooltip } from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import NightlightIcon from '@mui/icons-material/Nightlight'

import { ThemeContext } from '../../context/ThemeContext'

const ColorModeSwitch = () => {
	const { setColorMode, isDarkMode } = useContext(ThemeContext)

	return (
		<Tooltip id="color-mode-toggle-tooltip" title="Toggle color mode">
			<Switch
				checked={isDarkMode}
				onChange={() => {
					setColorMode(isDarkMode ? 'light' : 'dark')
					localStorage.setItem('colorMode', isDarkMode ? 'light' : 'dark')
				}}
				inputProps={{ 'aria-label': 'controlled' }}
				icon={<Brightness7Icon sx={{ color: 'rgb(243,203,61)' }} fontSize="small" />}
				checkedIcon={<NightlightIcon sx={{ color: 'white', fontSize: '20px' }} />}
			/>
		</Tooltip>
	)
}

export default ColorModeSwitch
