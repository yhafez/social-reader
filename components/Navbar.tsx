import { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, IconButton, Typography, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import TextToSpeechToggle from './buttons/TextToSpeechToggle'
import { ThemeContext } from '../context/ThemeContext'
import { BookViewerContext } from '../context/BookViewerContext'

const navLinks = [
	{
		url: '/',
		title: 'Home',
	},
	{
		url: '/about',
		title: 'About',
	},
	{
		url: '/contact',
		title: 'Contact',
	},
	{
		url: '/login',
		title: 'Login',
	},
	{
		url: '/signup',
		title: 'Sign Up',
	},
]

const Navbar = () => {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('md'))
	const { navIsExpanded, setNavIsExpanded } = useContext(BookViewerContext)
	const { isDarkMode, themeColor } = useContext(ThemeContext)

	useEffect(() => {
		return () => {
			if (matches) setNavIsExpanded(false)
			if (!matches) setNavIsExpanded(true)
		}
	}, [matches, setNavIsExpanded])

	return (
		<Box
			id="navbar-container"
			display="flex"
			alignItems={navIsExpanded ? 'flex-end' : 'center'}
			justifyContent="space-between"
			padding={navIsExpanded ? '1rem' : '0'}
			borderRadius="0 0 10px 10px"
			sx={{ backgroundColor: themeColor }}
		>
			<Box
				id="logo-container"
				sx={{
					ml: `${navIsExpanded ? '0' : '0.5rem'}`,
					mt: `${navIsExpanded ? '0' : '0.5rem'}`,
				}}
			>
				<Link href="/">
					<a>
						<Image
							id="logo"
							width={navIsExpanded ? '80' : '40'}
							height={navIsExpanded ? '80' : '40'}
							src="/social-reader-dark.png"
							style={{ borderRadius: '30%' }}
							alt="social reader logo"
						/>
					</a>
				</Link>
				{navIsExpanded && (
					<Link
						href="/"
						style={{
							textDecoration: 'none',
						}}
					>
						<a>
							<Typography
								sx={{
									fontSize: '1.5rem',
									mt: 1,
									color: isDarkMode ? 'white' : 'black',
								}}
							>
								Social Reader
							</Typography>
						</a>
					</Link>
				)}
			</Box>

			<Box id="links-container" display="flex" alignItems="center">
				{navLinks.map(link => (
					<Link href={link.url} key={link.title} style={{ textDecoration: 'none' }}>
						<a>
							<Typography
								sx={{
									fontSize: `${navIsExpanded ? '1.5rem' : '1rem'}`,
									mb: navIsExpanded ? 0.5 : 0,
									mx: 2,
									'&:hover': {
										fontSize: `${navIsExpanded ? '1.55rem' : '1.05rem'}`,
									},
									color: isDarkMode ? 'white' : 'black',
									'@media screen and (max-width: 600px)': {
										fontSize: '1rem',
										mx: 1.5,
										'&:hover': {
											fontSize: '1.1rem',
										},
									},
								}}
							>
								{link.title}
							</Typography>
						</a>
					</Link>
				))}
			</Box>

			{matches && (
				<Box
					id="nav-controls-container"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="flex-end"
				>
					<TextToSpeechToggle />
					<Tooltip id="navbar-toggle-tooltip" title="Toggle navbar">
						<IconButton
							id="expand-button"
							color="inherit"
							onClick={() => setNavIsExpanded(navExpanded => !navExpanded)}
						>
							{navIsExpanded ? (
								<ArrowDropUpIcon id="retract-icon" fontSize="large" />
							) : (
								<ArrowDropDownIcon id="expand-icon" fontSize="large" />
							)}
						</IconButton>
					</Tooltip>
				</Box>
			)}
		</Box>
	)
}

export default Navbar
