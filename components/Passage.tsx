import { useState, useEffect, useContext, Fragment, MouseEvent } from 'react'
import { Box } from '@mui/material'
import Image from 'next/future/image'

import { BookViewerContext } from '../context/BookViewerContext'
import { IChapterImage } from '../pages/api/epub'
import Word from './Word'

const Passage = ({
	passage,
	passageIndex,
	chapterIndex,
	chapterImages,
}: {
	passage: string
	passageIndex: number
	chapterIndex: number
	chapterImages: IChapterImage[]
}) => {
	const {
		imagesAreVisible,
		speech,
		isPlaying,
		setIsPlaying,
		highlightHoverColor,
		highlightSpeech,
		volume,
		rate,
		pitch,
		voice,
	} = useContext(BookViewerContext)
	const [isSpeaking, setIsSpeaking] = useState(false)

	useEffect(() => {
		if (isPlaying) {
			speech.init({
				volume,
				rate,
				pitch,
				voice: voice?.name,
				lang: voice?.lang,
				splitSentences: true,
			})
			speech.speak({
				text: passage?.replaceAll(/@([\w\W]+?)@/g, ''),
				queue: true,
				listeners: {
					onstart: () => {
						setIsPlaying(true)
						setIsSpeaking(true)
					},
					onresume: () => {
						setIsSpeaking(true)
					},
					onend: () => {
						setIsSpeaking(false)
						setIsPlaying(false)
					},
					onpause: () => {
						setIsSpeaking(false)
					},
				},
			})
		}
	}, [speech, setIsPlaying, isPlaying, passage, pitch, rate, volume, voice])

	return (
		<Fragment>
			{passage.split(/\s+/g).map((word, wordIndex) =>
				word.startsWith('@') && word.endsWith('@') ? (
					<Fragment
						key={`chapter-${chapterIndex}-passage-${passageIndex}-image-${wordIndex}-container`}
					>
						{imagesAreVisible && (
							<>
								<Box display="flex" justifyContent="center" alignItems="center" width="100%">
									<Image
										id={`chapter-${chapterIndex}-passage-${passageIndex}-image-${wordIndex}`}
										src={
											chapterImages.find(
												chapterImage => chapterImage.uuid === word.replaceAll('@', ''),
											)?.src || ''
										}
										alt={
											chapterImages.find(
												chapterImage => chapterImage.uuid === word.replaceAll('@', ''),
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
								<br id={`image-line-break-${wordIndex}`} />
							</>
						)}
					</Fragment>
				) : (
					<Fragment key={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}`}>
						<span
							id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}-container`}
							style={{
								borderRadius: '2px',
								backgroundColor:
									isSpeaking && isPlaying && highlightSpeech ? highlightHoverColor : '',
							}}
						>
							<Word
								word={word}
								wordIndex={wordIndex}
								passageIndex={passageIndex}
								chapterIndex={chapterIndex}
							/>
						</span>
					</Fragment>
				),
			)}
			<br id={`passage-line-break-${passageIndex}`} />
		</Fragment>
	)
}

export default Passage
