import { StateCreator } from 'zustand'
import {
	IAudioPlayerSlice,
	IBookSlice,
	IBookViewerSlice,
	ISidebarSlice,
	ISpeedReaderSlice,
	IThemeSlice,
	IUserSlice,
	IBook,
	IChapter,
} from '../../@types'

const createBookSlice: StateCreator<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice,
	[],
	[],
	IBookSlice
> = set => ({
	book: null,
	setBook: (book: IBook) => set({ book }),
	clearBook: () => set({ book: null }),

	chapter: null,
	setChapter: (chapter: IChapter) => set({ chapter }),
	clearChapter: () => set({ chapter: null }),

	resetBook: () => {
		set({
			book: null,
			chapter: null,
		})
	},
})

export default createBookSlice
