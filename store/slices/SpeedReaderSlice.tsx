import { StateCreator } from 'zustand'
import {
	IAudioPlayerSlice,
	IBookSlice,
	IBookViewerSlice,
	ISidebarSlice,
	ISpeedReaderSlice,
	IThemeSlice,
	IUserSlice,
	IWord,
} from '../../@types'

const createSpeedReaderSlice: StateCreator<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice,
	[],
	[],
	ISpeedReaderSlice
> = set => ({
	srIsPlaying: false,
	setSrIsPlaying: (srIsPlaying: boolean) => set({ srIsPlaying }),
	toggleSrIsPlaying: () => set(state => ({ srIsPlaying: !state.srIsPlaying })),

	srIsPaused: false,
	setSrIsPaused: (srIsPaused: boolean) => set({ srIsPaused }),
	toggleSrIsPaused: () => set(state => ({ srIsPaused: !state.srIsPaused })),

	srIsStopped: true,
	setSrIsStopped: (srIsStopped: boolean) => set({ srIsStopped }),
	toggleSrIsStopped: () => set(state => ({ srIsStopped: !state.srIsStopped })),

	srWords: [],
	setSrWords: (srWords: IWord[]) => set({ srWords }),
	clearSrWords: () => set({ srWords: [] }),

	srWord: null,
	setSrWord: (srWord: IWord) => set({ srWord }),
	clearSrWord: () => set({ srWord: null }),

	wordsPerMinute: 300,
	setWordsPerMinute: (wordsPerMinute: number) => set({ wordsPerMinute }),
	increaseWordsPerMinute: () => set(state => ({ wordsPerMinute: state.wordsPerMinute + 50 })),
	decreaseWordsPerMinute: () => set(state => ({ wordsPerMinute: state.wordsPerMinute - 50 })),
	resetWordsPerMinute: () => set({ wordsPerMinute: 300 }),

	resetSr: () => {
		set({
			srIsPlaying: false,
			srIsPaused: false,
			srIsStopped: true,
			srWords: [],
			srWord: null,
			wordsPerMinute: 300,
		})
	},
})

export default createSpeedReaderSlice
