import { useEffect } from 'react'
import { IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import useBoundStore from '../../store'

const ToggleNavbar = () => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('md'))
	const { navIsExpanded, setNavIsExpanded, toggleNavIsExpanded } = useBoundStore()

	useEffect(() => {
		return () => {
			if (matches) setNavIsExpanded(false)
			if (!matches) setNavIsExpanded(true)
		}
	}, [matches, setNavIsExpanded])

	useEffect(() => {
		const storedNavIsExpanded = localStorage.getItem('navIsExpanded')
		if (storedNavIsExpanded) setNavIsExpanded(storedNavIsExpanded === 'true')
	}, [setNavIsExpanded])
	return (
		<Tooltip id="navbar-toggle-tooltip" title="Toggle navbar">
			<IconButton
				id="expand-button"
				color="inherit"
				onClick={() => {
					toggleNavIsExpanded()
					localStorage.setItem('navIsExpanded', JSON.stringify(!navIsExpanded))
				}}
			>
				{navIsExpanded ? (
					<ArrowDropUpIcon id="retract-icon" fontSize="large" />
				) : (
					<ArrowDropDownIcon id="expand-icon" fontSize="large" />
				)}
			</IconButton>
		</Tooltip>
	)
}

export default ToggleNavbar
