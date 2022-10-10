import { IPassage } from '../@types'

export function readUtterance(
	volume: number,
	rate: number,
	pitch: number,
	voice: SpeechSynthesisVoice | null,
	speech: any,
	passages: IPassage[],
	passageIndex: number,
	setTtsIsPlaying: (ttsIsPlaying: boolean) => void,
	setTtsPassageBeingRead: (ttsPassageBeingRead: IPassage) => void,
	firstWordIndex?: number,
) {
	speech?.init({
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
			setTtsIsPlaying,
			setTtsPassageBeingRead,
		)
	} else {
		speech.speak({
			text: firstWordIndex
				? passages[passageIndex].content
						?.split(/\s+/g)
						.slice(+firstWordIndex)
						.join(' ')
						.replaceAll(/@([\w\W]+?)@/g, '')
				: passages[passageIndex].content.replaceAll(/@([\w\W]+?)@/g, ''),
			queue: firstWordIndex ? false : true,
			listeners: {
				onstart: () => {
					setTtsPassageBeingRead(passages[passageIndex])
					setTtsIsPlaying(true)
				},
				onend: () => {
					setTtsIsPlaying(false)
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
			setTtsIsPlaying,
			setTtsPassageBeingRead,
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
		if (annotationsAreVisible) {
			processHighlightText(
				startContainer.parentElement,
				endContainer.parentElement,
				key,
				highlightColor,
			)
		} else
			(document.querySelectorAll(`.${key}`) as NodeListOf<HTMLElement>).forEach(element => {
				element.style.backgroundColor = 'transparent'
				element.style.color = 'inherit'

				element.classList.remove(key)
				element.classList.remove('selected')

				if (element.classList.length === 0) element.removeAttribute('class')
				if (element.style.cssText === '') element.removeAttribute('style')
			})
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
