import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'
import { IParsedChapter } from '../pages/api/epub'

export interface IBookViewerState {
	annotationsAreVisible: boolean
	setAnnotationsAreVisible: Dispatch<SetStateAction<boolean>>
	navIsExpanded: boolean
	setNavIsExpanded: Dispatch<SetStateAction<boolean>>
	fontSize: number
	setFontSize: Dispatch<SetStateAction<number>>
	highlightColor: string
	setHighlightColor: Dispatch<SetStateAction<string>>
	highlightHoverColor: string
	setHighlightHoverColor: Dispatch<SetStateAction<string>>
	imagesAreVisible: boolean
	setImagesAreVisible: Dispatch<SetStateAction<boolean>>
	chapters: IParsedChapter[]
	setChapters: Dispatch<SetStateAction<IParsedChapter[]>>
	chapter: number
	setChapter: Dispatch<SetStateAction<number>>
	isPlaying: boolean
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	speech: any
	setSpeech: Dispatch<SetStateAction<any | null>>
	highlightSpeech: boolean
	setHighlightSpeech: Dispatch<SetStateAction<boolean>>
	pitch: number
	setPitch: Dispatch<SetStateAction<number>>
	rate: number
	setRate: Dispatch<SetStateAction<number>>
	volume: number
	setVolume: Dispatch<SetStateAction<number>>
	voice: SpeechSynthesisVoice | null
	setVoice: Dispatch<SetStateAction<SpeechSynthesisVoice | null>>
}

export const BookViewerContext = createContext<IBookViewerState>({
	annotationsAreVisible: true,
	setAnnotationsAreVisible: () => null,
	navIsExpanded: true,
	setNavIsExpanded: () => null,
	fontSize: 1,
	setFontSize: () => null,
	highlightColor: '#f0ba00',
	setHighlightColor: () => null,
	highlightHoverColor: '#e8cb6b',
	setHighlightHoverColor: () => null,
	imagesAreVisible: true,
	setImagesAreVisible: () => null,
	chapters: [],
	setChapters: () => null,
	chapter: 0,
	setChapter: () => null,
	speech: null,
	setSpeech: () => null,
	isPlaying: false,
	setIsPlaying: () => null,
	highlightSpeech: true,
	setHighlightSpeech: () => null,
	pitch: 1,
	setPitch: () => null,
	rate: 1,
	setRate: () => null,
	volume: 1,
	setVolume: () => null,
	voice: null,
	setVoice: () => null,
})

const BookViewerProvider = ({ children }: { children: ReactNode }) => {
	const [annotationsAreVisible, setAnnotationsAreVisible] = useState(true)
	const [navIsExpanded, setNavIsExpanded] = useState(true)
	const [fontSize, setFontSize] = useState(1)
	const [highlightColor, setHighlightColor] = useState('#f0ba00')
	const [highlightHoverColor, setHighlightHoverColor] = useState('#e8cb6b')
	const [imagesAreVisible, setImagesAreVisible] = useState(true)
	const [chapters, setChapters] = useState<IParsedChapter[]>([])
	const [chapter, setChapter] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [speech, setSpeech] = useState<any | null>(null)
	const [highlightSpeech, setHighlightSpeech] = useState(true)
	const [pitch, setPitch] = useState(1)
	const [rate, setRate] = useState(1)
	const [volume, setVolume] = useState(1)
	const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)

	return (
		<BookViewerContext.Provider
			value={{
				annotationsAreVisible,
				setAnnotationsAreVisible,
				navIsExpanded,
				setNavIsExpanded,
				fontSize,
				setFontSize,
				highlightColor,
				setHighlightColor,
				highlightHoverColor,
				setHighlightHoverColor,
				imagesAreVisible,
				setImagesAreVisible,
				chapters,
				setChapters,
				chapter,
				setChapter,
				isPlaying,
				setIsPlaying,
				speech,
				setSpeech,
				highlightSpeech,
				setHighlightSpeech,
				pitch,
				setPitch,
				rate,
				setRate,
				volume,
				setVolume,
				voice,
				setVoice,
			}}
		>
			{children}
		</BookViewerContext.Provider>
	)
}

export default BookViewerProvider
