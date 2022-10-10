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

const createBookViewerSlice: StateCreator<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice,
	[],
	[],
	IBookViewerSlice
> = set => ({
	navIsExpanded: false,
	setNavIsExpanded: (navIsExpanded: boolean) => set({ navIsExpanded }),
	toggleNavIsExpanded: () => set(state => ({ navIsExpanded: !state.navIsExpanded })),

	annotationsAreVisible: true,
	setAnnotationsAreVisible: (annotationsAreVisible: boolean) => set({ annotationsAreVisible }),
	toggleAnnotationsAreVisible: () =>
		set(state => ({ annotationsAreVisible: !state.annotationsAreVisible })),

	fontSize: 16,
	setFontSize: (fontSize: number) => set({ fontSize }),
	increaseFontSize: () => set(state => ({ fontSize: state.fontSize + 1 })),
	decreaseFontSize: () => set(state => ({ fontSize: state.fontSize - 1 })),

	highlightColor: '#f0ba00',
	setHighlightColor: (highlightColor: string) => set({ highlightColor }),

	highlightHoverColor: '#e8cb6b',
	setHighlightHoverColor: (highlightHoverColor: string) => set({ highlightHoverColor }),

	imagesAreVisible: true,
	setImagesAreVisible: (imagesAreVisible: boolean) => set({ imagesAreVisible }),
	toggleImagesAreVisible: () => set(state => ({ imagesAreVisible: !state.imagesAreVisible })),

	ttsIsOpen: false,
	setTtsIsOpen: (ttsIsOpen: boolean) => set({ ttsIsOpen }),
	toggleTtsIsOpen: () => set(state => ({ ttsIsOpen: !state.ttsIsOpen })),

	speedReaderIsOpen: false,
	setSpeedReaderIsOpen: (speedReaderIsOpen: boolean) => set({ speedReaderIsOpen }),
	toggleSpeedReaderIsOpen: () => set(state => ({ speedReaderIsOpen: !state.speedReaderIsOpen })),

	sideBarIsOpen: false,
	setSideBarIsOpen: (sideBarIsOpen: boolean) => set({ sideBarIsOpen }),
	toggleSideBarIsOpen: () => set(state => ({ sideBarIsOpen: !state.sideBarIsOpen })),

	view: 'single-column',
	setView: (view: 'single-column' | 'split') => set({ view }),
	toggleView: () =>
		set(state => ({ view: state.view === 'single-column' ? 'split' : 'single-column' })),

	dictionaryIsOpen: false,
	setDictionaryIsOpen: (dictionaryIsOpen: boolean) => set({ dictionaryIsOpen }),
	toggleDictionaryIsOpen: () => set(state => ({ dictionaryIsOpen: !state.dictionaryIsOpen })),

	resetBookViewer: () => {
		set({
			navIsExpanded: false,
			annotationsAreVisible: true,
			fontSize: 16,
			highlightColor: '#f0ba00',
			highlightHoverColor: '#e8cb6b',
			imagesAreVisible: true,
			ttsIsOpen: false,
			speedReaderIsOpen: false,
			sideBarIsOpen: false,
			view: 'single-column',
			dictionaryIsOpen: false,
		})
	},
})

export default createBookViewerSlice
