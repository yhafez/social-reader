import { createContext, useState, useMemo, ReactNode, SetStateAction, Dispatch } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

export interface ITheme {
	colorMode: 'dark' | 'light'
	setColorMode: Dispatch<SetStateAction<'dark' | 'light'>>
	isDarkMode: boolean
	themeColor: string
	setThemeColor: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ITheme>({
	colorMode: 'dark',
	setColorMode: () => null,
	isDarkMode: true,
	themeColor: '#7230b0',
	setThemeColor: () => null,
})

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const [colorMode, setColorMode] = useState<'dark' | 'light'>(prefersDarkMode ? 'dark' : 'light')
	const [themeColor, setThemeColor] = useState('#7230b0')

	const isDarkMode = colorMode === 'dark'

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: colorMode,
				},
			}),
		[colorMode],
	)

	return (
		<ThemeContext.Provider
			value={{ colorMode, setColorMode, isDarkMode, themeColor, setThemeColor }}
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider
