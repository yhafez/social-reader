import { StateCreator } from 'zustand'
import {
	IAudioPlayerSlice,
	IBookSlice,
	IBookViewerSlice,
	IPassage,
	ISidebarSlice,
	ISpeedReaderSlice,
	IThemeSlice,
	IUserSlice,
	IWord,
} from '../../@types'

const createAudioPlayerSlice: StateCreator<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice,
	[],
	[],
	IAudioPlayerSlice
> = set => ({
	speech: null,
	setSpeech: (speech: SpeechSynthesis) => set({ speech }),

	speechSynthesisUtterance: null,
	setSpeechSynthesisUtterance: (speechSynthesisUtterance: SpeechSynthesisUtterance) =>
		set({ speechSynthesisUtterance }),

	ttsIsSpeaking: false,
	setTtsIsSpeaking: (ttsIsSpeaking: boolean) => set({ ttsIsSpeaking }),
	toggleTtsIsSpeaking: () => set(state => ({ ttsIsSpeaking: !state.ttsIsSpeaking })),

	ttsIsPaused: false,
	setTtsIsPaused: (ttsIsPaused: boolean) => set({ ttsIsPaused }),
	toggleTtsIsPaused: () => set(state => ({ ttsIsPaused: !state.ttsIsPaused })),

	ttsIsStopped: false,
	setTtsIsStopped: (ttsIsStopped: boolean) => set({ ttsIsStopped }),
	toggleTtsIsStopped: () => set(state => ({ ttsIsStopped: !state.ttsIsStopped })),

	ttsIsMuted: false,
	setTtsIsMuted: (ttsIsMuted: boolean) => set({ ttsIsMuted }),
	toggleTtsIsMuted: () => set(state => ({ ttsIsMuted: !state.ttsIsMuted })),

	ttsIsPlaying: false,
	setTtsIsPlaying: (ttsIsPlaying: boolean) => set({ ttsIsPlaying }),
	toggleTtsIsPlaying: () => set(state => ({ ttsIsPlaying: !state.ttsIsPlaying })),

	ttsIsLoaded: false,
	setTtsIsLoaded: (ttsIsLoaded: boolean) => set({ ttsIsLoaded }),
	toggleTtsIsLoaded: () => set(state => ({ ttsIsLoaded: !state.ttsIsLoaded })),

	voice: null,
	setVoice: (voice: SpeechSynthesisVoice) => set({ voice }),

	voices: [],
	setVoices: (voices: SpeechSynthesisVoice[]) => set({ voices }),

	volume: 1,
	setVolume: (volume: number) => set({ volume }),
	increaseVolume: () => set(state => ({ volume: state.volume + 0.1 })),
	decreaseVolume: () => set(state => ({ volume: state.volume - 0.1 })),

	rate: 1,
	setRate: (rate: number) => set({ rate }),
	increaseRate: () => set(state => ({ rate: state.rate + 0.1 })),
	decreaseRate: () => set(state => ({ rate: state.rate - 0.1 })),

	pitch: 1,
	setPitch: (pitch: number) => set({ pitch }),
	increasePitch: () => set(state => ({ pitch: state.pitch + 0.1 })),
	decreasePitch: () => set(state => ({ pitch: state.pitch - 0.1 })),

	ttsText: '',
	setTtsText: (ttsText: string) => set({ ttsText }),

	ttsWord: null,
	setTtsWord: (ttsWord: IWord) => set({ ttsWord }),
	clearTtsWord: () => set({ ttsWord: null }),

	ttsWords: [],
	setTtsWords: (ttsWords: IWord[]) => set({ ttsWords }),
	clearTtsWords: () => set({ ttsWords: [] }),

	highlightTtsSpeech: false,
	setHighlightTtsSpeech: (highlightTtsSpeech: boolean) => set({ highlightTtsSpeech }),
	toggleHighlightTtsSpeech: () => set(state => ({ highlightTtsSpeech: !state.highlightTtsSpeech })),

	ttsPassageBeingRead: null,
	setTtsPassageBeingRead: (ttsPassageBeingRead: IPassage) => set({ ttsPassageBeingRead }),
	clearTtsPassageBeingRead: () => set({ ttsPassageBeingRead: null }),

	resetTts: () => {
		set({
			speech: null,
			speechSynthesisUtterance: null,
			ttsIsSpeaking: false,
			ttsIsPaused: false,
			ttsIsStopped: false,
			ttsIsMuted: false,
			ttsIsPlaying: false,
			ttsIsLoaded: false,
			voice: null,
			voices: [],
			volume: 1,
			rate: 1,
			pitch: 1,
			ttsText: '',
			ttsWord: null,
			ttsWords: [],
			highlightTtsSpeech: false,
		})
	},
})

export default createAudioPlayerSlice
