import { useEffect, useContext, Fragment } from 'react'
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
		highlightHoverColor,
		highlightSpeech,
		passages,
		isPlaying,
		passageBeingRead,
	} = useContext(BookViewerContext)

	useEffect(() => {
		if (!passages[passageIndex]) passages[passageIndex] = passage
	}, [passage, passageIndex, passages])

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
									isPlaying && highlightSpeech && passageBeingRead === passageIndex
										? highlightHoverColor
										: '',
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
