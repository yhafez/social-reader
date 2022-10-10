// Set up Zustand store
import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

import AudioPlayerSlice from './slices/AudioPlayerSlice'
import BookViewerSlice from './slices/BookViewerSlice'
import SidebarSlice from './slices/SidebarSlice'
import ThemeSlice from './slices/ThemeSlice'
import BookSlice from './slices/BookSlice'
import UserSlice from './slices/UserSlice'
import SpeedReaderSlice from './slices/SpeedReaderSlice'
import {
	IAudioPlayerSlice,
	IBookSlice,
	IBookViewerSlice,
	ISidebarSlice,
	ISpeedReaderSlice,
	IThemeSlice,
	IUserSlice,
	IStore,
} from '../@types'

const useBoundStore = create<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice &
		IStore
>()((set, get, ...a) => ({
	...AudioPlayerSlice(set, get, ...a),
	...BookSlice(set, get, ...a),
	...BookViewerSlice(set, get, ...a),
	...SidebarSlice(set, get, ...a),
	...SpeedReaderSlice(set, get, ...a),
	...ThemeSlice(set, get, ...a),
	...UserSlice(set, get, ...a),

	resetStore: () => {
		const initialState = useBoundStore.getState()
		useBoundStore.setState(initialState)
	},

	computed: {
		get isDarkMode() {
			return get().colorMode === 'dark'
		},
		get chapters() {
			return get().book?.chapters || []
		},
		get chapterIndex() {
			return get().chapter?.index ?? 0
		},
		get chapterContent() {
			return get().chapter?.content ?? ''
		},
		get chapterImages() {
			return get().chapter?.images ?? []
		},
		get passages() {
			return get().chapter?.passages ?? []
		},
	},
}))

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('BoundStore', useBoundStore)
}

export default useBoundStore
