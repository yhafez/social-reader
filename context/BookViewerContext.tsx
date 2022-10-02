import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'

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
	voices: SpeechSynthesisVoice[]
	setVoices: Dispatch<SetStateAction<SpeechSynthesisVoice[]>>
	voice: SpeechSynthesisVoice | null
	setVoice: Dispatch<SetStateAction<SpeechSynthesisVoice | null>>
	imagesAreVisible: boolean
	setImagesAreVisible: Dispatch<SetStateAction<boolean>>
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
	voices: [],
	setVoices: () => null,
	voice: null,
	setVoice: () => null,
	imagesAreVisible: true,
	setImagesAreVisible: () => null,
})

const BookViewerProvider = ({ children }: { children: ReactNode }) => {
	const [annotationsAreVisible, setAnnotationsAreVisible] = useState(true)
	const [navIsExpanded, setNavIsExpanded] = useState(true)
	const [fontSize, setFontSize] = useState(1)
	const [highlightColor, setHighlightColor] = useState('#f0ba00')
	const [highlightHoverColor, setHighlightHoverColor] = useState('#e8cb6b')
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
	const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
	const [imagesAreVisible, setImagesAreVisible] = useState(true)

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
				voices,
				setVoices,
				voice,
				setVoice,
				imagesAreVisible,
				setImagesAreVisible,
			}}
		>
			{children}
		</BookViewerContext.Provider>
	)
}

export default BookViewerProvider
