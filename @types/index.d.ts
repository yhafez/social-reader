import { IMetadata } from 'epub2/epub'
export interface IBook extends IMetadata {
	chapters: IChapter[]
}

export interface IChapterImage {
	uuid: string | null
	chapterIndex: number
	src: string
	alt: string
}
export interface IChapter {
	id: string
	index: number
	title?: string
	href: string
	bookUUID: string | null
	content: string
	passages: IPassage[] | null
	images: IChapterImage[]
}

export interface IPassage {
	index: number
	bookUUID: string | null
	chapterIndex: number
	content: string
	isHighlighted: boolean
	words: IWord[] | null
}

export interface IWord {
	index: number
	bookUUID: string | null
	chapterIndex: number
	passageIndex: number
	content: string
	isHighlighted: boolean
}

export interface IAddress {
	street: string
	city: string
	state: string
	zip: string
	country: string
}

export interface IName {
	prefix?: string
	first: string
	middle?: string
	last: string
	suffix?: string
}

export interface ICard {
	id: number
	type: 'credit' | 'debit' // Can be derived
	brand: 'visa' | 'mastercard' | 'amex' | 'discover' // Can be derived

	// Credit Card
	cardNumber: string
	expirationMonth: number
	expirationYear: number
	cvv: string
	zip: string

	// Billing Address
	address: IAddress

	// Name on Card
	name: IName
}

export interface IPaypal {
	email: string
}

export interface ISubscription {
	id: number
	plan: IPlan
	card: ICard
	startDate: Date
	endDate: Date
}
export interface IPlan {
	id: number
	name: string
	description: string
	price: number
	currency: string
	interval: 'month' | 'year'
	intervalCount: number
}
export interface IUser {
	id: number
	username: string
	name: IName
	email: string
	birthday: Date
	address: IAddress
	phone: string
	salt: string
	password: string
	books: IBook[]
	subscription: ISubscription
	paymentMethods: ICard[] | IPaypal[]
	isActive: boolean
	avatar: string
}

export interface IAuth {
	user: IUser
	token: string
}

export interface IBookNav {
	side: 'left' | 'right'
	epubLength: number
}

export interface IBookSelection extends Range {
	id: string
}

export interface IThemeSlice {
	colorMode: 'light' | 'dark' | 'system'
	setColorMode: (colorMode: 'light' | 'dark' | 'system') => void
	toggleColorMode: () => void

	themeColor: string
	setThemeColor: (themeColor: string) => void

	resetTheme: () => void
}
export interface IBookSlice {
	book: IBook | null
	setBook: (book: IBook) => void
	clearBook: () => void

	chapter: IChapter | null
	setChapter: (chapter: IChapter) => void
	clearChapter: () => void

	resetBook: () => void
}

export interface IBookViewerSlice {
	navIsExpanded: boolean
	setNavIsExpanded: (navIsExpanded: boolean) => void
	toggleNavIsExpanded: () => void

	view: 'split' | 'single-column'
	setView: (view: 'split' | 'single-column') => void
	toggleView: () => void

	annotationsAreVisible: boolean
	setAnnotationsAreVisible: (annotationsAreVisible: boolean) => void
	toggleAnnotationsAreVisible: () => void

	fontSize: number
	setFontSize: (fontSize: number) => void
	increaseFontSize: () => void
	decreaseFontSize: () => void

	highlightColor: string
	setHighlightColor: (highlightColor: string) => void

	highlightHoverColor: string
	setHighlightHoverColor: (highlightHoverColor: string) => void

	imagesAreVisible: boolean
	setImagesAreVisible: (imagesAreVisible: boolean) => void
	toggleImagesAreVisible: () => void

	ttsIsOpen: boolean
	setTtsIsOpen: (ttsIsOpen: boolean) => void
	toggleTtsIsOpen: () => void

	speedReaderIsOpen: boolean
	setSpeedReaderIsOpen: (speedReaderIsOpen: boolean) => void
	toggleSpeedReaderIsOpen: () => void

	dictionaryIsOpen: boolean
	setDictionaryIsOpen: (dictionaryIsOpen: boolean) => boid
	toggleDictionaryIsOpen: () => void

	sideBarIsOpen: boolean
	setSideBarIsOpen: (sideBarIsOpen: boolean) => void
	toggleSideBarIsOpen: () => void

	resetBookViewer: () => void
}

export interface IAudioPlayerSlice {
	speech: SpeechSynthesis | null
	setSpeech: (speech: SpeechSynthesis) => void

	speechSynthesisUtterance: SpeechSynthesisUtterance | null
	setSpeechSynthesisUtterance: (speechSynthesisUtterance: SpeechSynthesisUtterance) => void

	ttsIsSpeaking: boolean
	setTtsIsSpeaking: (ttsIsSpeaking: boolean) => void
	toggleTtsIsSpeaking: () => void

	ttsIsPaused: boolean
	setTtsIsPaused: (ttsIsPaused: boolean) => void
	toggleTtsIsPaused: () => void

	ttsIsStopped: boolean
	setTtsIsStopped: (ttsIsStopped: boolean) => void
	toggleTtsIsStopped: () => void

	ttsIsMuted: boolean
	setTtsIsMuted: (ttsIsMuted: boolean) => void
	toggleTtsIsMuted: () => void

	ttsIsPlaying: boolean
	setTtsIsPlaying: (ttsIsPlaying: boolean) => void
	toggleTtsIsPlaying: () => void

	ttsIsLoaded: boolean
	setTtsIsLoaded: (ttsIsLoaded: boolean) => void
	toggleTtsIsLoaded: () => void

	voice: SpeechSynthesisVoice | null
	setVoice: (voice: SpeechSynthesisVoice) => void

	voices: SpeechSynthesisVoice[]
	setVoices: (voices: SpeechSynthesisVoice[]) => void

	volume: number
	setVolume: (volume: number) => void
	increaseVolume: () => void
	decreaseVolume: () => void

	rate: number
	setRate: (rate: number) => void
	increaseRate: () => void
	decreaseRate: () => void

	pitch: number
	setPitch: (pitch: number) => void
	increasePitch: () => void
	decreasePitch: () => void

	ttsText: string
	setTtsText: (ttsText: string) => void

	ttsWord: IWord | null
	setTtsWord: (ttsWord: IWord) => void
	clearTtsWord: () => void

	ttsWords: IWord[]
	setTtsWords: (ttsWords: IWord[]) => void
	clearTtsWords: () => void

	highlightTtsSpeech: boolean
	setHighlightTtsSpeech: (highlightTtsSpeech: boolean) => void
	toggleHighlightTtsSpeech: () => void

	ttsPassageBeingRead: IPassage | null
	setTtsPassageBeingRead: (ttsPassageBeingRead: IPassage) => void
	clearTtsPassageBeingRead: () => void

	resetTts: () => void
}

export interface ISpeedReaderSlice {
	srIsPlaying: boolean
	setSrIsPlaying: (srIsPlaying: boolean) => void
	toggleSrIsPlaying: () => void

	srIsPaused: boolean
	setSrIsPaused: (srIsPaused: boolean) => void
	toggleSrIsPaused: () => void

	srIsStopped: boolean
	setSrIsStopped: (srIsStopped: boolean) => void
	toggleSrIsStopped: () => void

	srWords: IWord[]
	setSrWords: (srWords: IWord[]) => void
	clearSrWords: () => void

	srWord: IWord | null
	setSrWord: (srWord: IWord) => void
	clearSrWord: () => void

	wordsPerMinute: number
	setWordsPerMinute: (wordsPerMinute: number) => void
	increaseWordsPerMinute: () => void
	decreaseWordsPerMinute: () => void
	resetWordsPerMinute: () => void

	resetSr: () => void
}

export interface ISidebarSlice {
	side: 'left' | 'right'
	setSide: (side: 'left' | 'right') => void
	toggleSide: () => void

	tab: 'annotations' | 'chapters' | 'search'
	setTab: (tab: 'annotations' | 'chapters' | 'search') => void

	resetSidebar: () => void
}

export interface IUserSlice {
	isAuthenticated: boolean
	setIsAuthenticated: (isAuthenticated: boolean) => void
	toggleIsAuthenticated: () => void

	user: IUser | null
	setUser: (user: IUser) => void
	clearUser: () => void

	token: string | null
	setToken: (token: string) => void
	clearToken: () => void

	loading: boolean
	setLoading: (loading: boolean) => void
	toggleLoading: () => void

	error: string | null
	setError: (error: string) => void
	clearError: () => void

	success: string | null
	setSuccess: (success: string) => void
	clearSuccess: () => void

	books: IBook[]
	setBooks: (books: IBook[]) => void
	clearBooks: () => void

	resetUser: () => void
}

export interface IStore {
	resetStore: () => void
	computed: {
		isDarkMode: boolean
		chapters: IChapter[]
		chapterIndex: number
		chapterContent: string
		chapterImages: IChapterImage[]
		passages: IPassage[] | null
	}
}
