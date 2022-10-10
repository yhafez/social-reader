import { Fragment } from 'react'
import { Box } from '@mui/material'
import Image from 'next/future/image'

import useBoundStore from '../store'
import Word from './Word'
import { IPassage } from '../@types'

const Passage = ({ passage }: { passage: IPassage }) => {
	const {
		imagesAreVisible,
		highlightHoverColor,
		highlightTtsSpeech,
		ttsIsPlaying,
		ttsPassageBeingRead,
		computed: { chapterIndex, chapterImages },
	} = useBoundStore()

	// const passageId = `passage-${passageIndex}-container`

	// const passageRef = useRef<HTMLDivElement>(null)

	// const passageWords = useMemo(() => {
	// 	const words = passage.split(' ')

	// 	return words.map((word, index) => {
	// 		const wordId = `word-${passageIndex}-${index}`
	// 		const wordRef = useRef<HTMLSpanElement>(null)

	// 		return {
	// 			id: wordId,
	// 			ref: wordRef,
	// 			word,
	// 		}
	// 	})
	// }, [passage, passageIndex])

	// useEffect(() => {
	// 	if (passageRef.current) {
	// 		const passageElement = passageRef.current

	// 		const passageWords = passageElement.querySelectorAll('span')

	// 		passageWords.forEach(word => {
	// 			word.addEventListener('mouseenter', handleWordMouseEnter)
	// 			word.addEventListener('mouseleave', handleWordMouseLeave)
	// 		})

	// 		return () => {
	// 			passageWords.forEach(word => {
	// 				word.removeEventListener('mouseenter', handleWordMouseEnter)
	// 				word.removeEventListener('mouseleave', handleWordMouseLeave)
	// 			})
	// 		}
	// 	}
	// }, [passageRef])

	// const handleWordMouseEnter = (e: MouseEvent) => {
	// 	const word = e.target as HTMLSpanElement

	// 	if (word) {
	// 		const wordId = word.id

	// 		const wordIndex = wordId.split('-')[2]

	// 		const passageIndex = wordId.split('-')[1]

	// 		const passage = passages[parseInt(passageIndex)]

	// 		const wordData = passage.words[parseInt(wordIndex)]

	// 		if (wordData) {
	// 			const { highlight } = wordData

	// 			if (highlight) {
	// 				const highlightId = `highlight-${highlight.id}`
	// 				const highlightElement = document.getElementById(highlightId)

	// 				if (highlightElement) {
	// 					highlightElement.style.backgroundColor = highlightHoverColor
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// const handleWordMouseLeave = (e: MouseEvent) => {
	// 	const word = e.target as HTMLSpanElement

	// 	if (word) {
	// 		const wordId = word.id

	// 		const wordIndex = wordId.split('-')[2]

	// 		const passageIndex = wordId.split('-')[1]

	// 		const passage = passages[parseInt(passageIndex)]

	// 		const wordData = passage.words[parseInt(wordIndex)]

	// 		if (wordData) {
	// 			const { highlight } = wordData

	// 			if (highlight) {
	// 				const highlightId = `highlight-${highlight.id}`
	// 				const highlightElement = document.getElementById(highlightId)

	// 				if (highlightElement) {
	// 					highlightElement.style.backgroundColor = highlight.color
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	return (
		<Fragment>
			{passage.words?.map(word =>
				word.content.startsWith('@') && word.content.endsWith('@') ? (
					<Fragment
						key={`chapter-${chapterIndex}-passage-${passage.index}-image-${word.index}-container`}
					>
						{imagesAreVisible && (
							<>
								<Box display="flex" justifyContent="center" alignItems="center" width="100%">
									<Image
										id={`chapter-${chapterIndex}-passage-${passage.index}-image-${word.index}`}
										src={
											chapterImages.find(
												chapterImage => chapterImage.uuid === word.content.replaceAll('@', ''),
											)?.src || ''
										}
										alt={
											chapterImages.find(
												chapterImage => chapterImage.uuid === word.content.replaceAll('@', ''),
											)?.alt || ''
										}
										width={10}
										height={10}
										style={{
											width: '25vw',
											height: 'auto',
										}}
									/>
								</Box>
								<br id={`image-line-break-${word.index}`} />
							</>
						)}
					</Fragment>
				) : (
					<Fragment key={`chapter-${chapterIndex}-passage-${passage.index}-word-${word.index}`}>
						<span
							id={`chapter-${chapterIndex}-passage-${passage.index}-word-${word.index}-container`}
							style={{
								borderRadius: '2px',
								backgroundColor:
									ttsIsPlaying && highlightTtsSpeech && ttsPassageBeingRead?.index === passage.index
										? highlightHoverColor
										: '',
							}}
						>
							<Word word={word} />
						</span>
					</Fragment>
				),
			)}
			<br id={`passage-line-break-${passage.index}`} />
		</Fragment>
	)
}

export default Passage
