import { StateCreator } from 'zustand'
import {
	IAudioPlayerSlice,
	IBookSlice,
	IBookViewerSlice,
	ISidebarSlice,
	ISpeedReaderSlice,
	IThemeSlice,
	IUserSlice,
} from '../../@types'

const createThemeSlice: StateCreator<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice,
	[],
	[],
	IThemeSlice
> = set => ({
	colorMode: 'system',
	setColorMode: (colorMode: 'light' | 'dark' | 'system') => set({ colorMode }),
	toggleColorMode: () =>
		set(state => ({ colorMode: state.colorMode === 'light' ? 'dark' : 'light' })),

	themeColor: '#7230b0',
	setThemeColor: (themeColor: string) => set({ themeColor }),

	resetTheme: () => {
		set({
			colorMode: 'system',
			themeColor: '#7230b0',
		})
	},
})

export default createThemeSlice
