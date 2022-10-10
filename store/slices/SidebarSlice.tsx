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

const createSidebarSlice: StateCreator<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice,
	[],
	[],
	ISidebarSlice
> = set => ({
	side: 'right',
	setSide: (side: 'left' | 'right') => set({ side }),
	toggleSide: () => set(state => ({ side: state.side === 'left' ? 'right' : 'left' })),

	tab: 'chapters',
	setTab: (tab: 'chapters' | 'annotations' | 'search') => set({ tab }),

	resetSidebar: () => {
		set({
			side: 'right',
			tab: 'chapters',
		})
	},
})

export default createSidebarSlice
