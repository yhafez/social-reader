import { Dispatch, SetStateAction } from 'react'

export function readUtterance(
	volume: number,
	rate: number,
	pitch: number,
	voice: SpeechSynthesisVoice | null,
	speech: any,
	passages: string[],
	passageIndex: number,
	setIsPlaying: Dispatch<SetStateAction<boolean>>,
	setPassageBeingRead: Dispatch<SetStateAction<number>>,
	firstWordIndex?: number,
) {
	speech.init({
		volume,
		rate,
		pitch,
		voice: voice?.name,
		lang: voice?.lang,
		splitSentences: true,
	})
	if (passageIndex > passages.length) return
	if (!passages[passageIndex]) {
		readUtterance(
			volume,
			rate,
			pitch,
			voice,
			speech,
			passages,
			passageIndex + 1,
			setIsPlaying,
			setPassageBeingRead,
		)
	} else {
		speech.speak({
			text: firstWordIndex
				? passages[passageIndex]
						?.split(/\s+/g)
						.slice(+firstWordIndex)
						.join(' ')
						.replaceAll(/@([\w\W]+?)@/g, '')
				: passages[passageIndex]?.replaceAll(/@([\w\W]+?)@/g, ''),
			queue: firstWordIndex ? false : true,
			listeners: {
				onstart: () => {
					setPassageBeingRead(passageIndex)
					setIsPlaying(true)
				},
				onend: () => {
					setIsPlaying(false)
				},
			},
		})
		readUtterance(
			volume,
			rate,
			pitch,
			voice,
			speech,
			passages,
			+passageIndex + 1,
			setIsPlaying,
			setPassageBeingRead,
		)
	}
}

export function handleHighlight(
	startContainer: Node,
	endContainer: Node,
	annotationsAreVisible: boolean,
	highlightColor: string,
	isSelected = false,
) {
	if (
		startContainer &&
		endContainer &&
		startContainer.parentElement &&
		endContainer.parentElement
	) {
		const key = `${startContainer.parentElement.id}-to-${endContainer.parentElement.id} ${
			isSelected ? 'selected' : ''
		}`
		if (annotationsAreVisible)
			processHighlightText(
				startContainer.parentElement,
				endContainer.parentElement,
				key,
				highlightColor,
			)
		else
			(document.querySelectorAll(`.${key}`) as NodeListOf<HTMLElement>).forEach(
				element => (element.style.backgroundColor = 'transparent'),
			)
	}
}

export function handleRemoveHighlight(startContainer: Node, endContainer: Node) {
	if (
		startContainer &&
		endContainer &&
		startContainer.parentElement &&
		endContainer.parentElement
	) {
		const key = `${startContainer.parentElement.id}-to-${endContainer.parentElement.id}`

		const highlightedElements: NodeListOf<HTMLElement> = document.querySelectorAll(`.${key}`)

		highlightedElements.forEach(element => {
			element.classList.remove(key, 'highlight', 'selected')
			element.style.backgroundColor = 'transparent'
		})
	}
}

export function highlightText(startContainer: HTMLElement, highlightColor: string, key: string) {
	startContainer.style.backgroundColor = highlightColor
	if (!startContainer.className.includes('highlight')) startContainer.className = `highlight`
	if (!startContainer.className.includes(key)) startContainer.className += ` ${key}`
}

export function processHighlightText(
	startContainer: HTMLElement,
	endContainer: HTMLElement,
	key: string,
	highlightColor: string,
) {
	if (startContainer === endContainer || startContainer.children[0] === endContainer) {
		highlightText(
			(startContainer?.children[0] as HTMLElement) || startContainer,
			highlightColor,
			key,
		)
	} else {
		if (startContainer?.id && endContainer?.id) {
			if (startContainer.id.includes('container')) {
				highlightText(startContainer?.children[0] as HTMLElement, highlightColor, key)
				highlightText(startContainer?.children[1] as HTMLElement, highlightColor, key)

				processHighlightText(
					startContainer.nextElementSibling as HTMLElement,
					endContainer,
					key,
					highlightColor,
				)
			} else if (startContainer?.nextElementSibling) {
				highlightText(startContainer, highlightColor, key)
				processHighlightText(
					startContainer.nextElementSibling as HTMLElement,
					endContainer,
					key,
					highlightColor,
				)
			} else if (startContainer?.parentElement?.nextElementSibling?.children[0]) {
				highlightText(startContainer, highlightColor, key)
				processHighlightText(
					startContainer?.parentElement?.nextElementSibling?.children[0] as HTMLElement,
					endContainer,
					key,
					highlightColor,
				)
			} else if (startContainer?.parentElement?.nextElementSibling) {
				highlightText(startContainer, highlightColor, key)
				processHighlightText(
					(startContainer?.parentElement?.nextElementSibling?.children[0] ||
						startContainer?.parentElement?.nextElementSibling) as HTMLElement,
					endContainer,
					key,
					highlightColor,
				)
			}
		}
	}
}
