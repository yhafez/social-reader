import {
	useState,
	useEffect,
	useContext,
	Fragment,
	MouseEvent,
	Dispatch,
	SetStateAction,
} from 'react'
import { Box, Popover, IconButton, ClickAwayListener } from '@mui/material'
import Image from 'next/future/image'
import CommentIcon from '@mui/icons-material/Comment'
import CampaignIcon from '@mui/icons-material/Campaign'

import { BookViewerContext } from '../context/BookViewerContext'
import { IChapterImage } from '../pages/api/epub'
import Word from './Word'
import Highlight from './buttons/Highlight'
import { handleHighlight, handleRemoveHighlight } from '../utils/helpers'
import { IBookSelection } from './ChapterView'

const Passage = ({
	passage,
	passageIndex,
	chapterIndex,
	chapterImages,
	selectedRange,
	setRanges,
}: {
	passage: string
	passageIndex: number
	chapterIndex: number
	chapterImages: IChapterImage[]
	selectedRange: IBookSelection | null
	setRanges: Dispatch<SetStateAction<IBookSelection[]>>
}) => {
	const {
		imagesAreVisible,
		speech,
		isPlaying,
		setIsPlaying,
		highlightColor,
		highlightHoverColor,
		highlightSpeech,
		volume,
		rate,
		pitch,
		voice,
		annotationsAreVisible,
	} = useContext(BookViewerContext)
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [popOverIsOpen, setPopOverIsOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null)
	const [highlightSelection, setHighlightSelection] = useState(false)

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

	const handleClosePopOver = () => {
		setPopOverIsOpen(false)
		setAnchorEl(null)
		document.querySelectorAll('.highlight').forEach(el => el.classList.remove('selected'))
		if (highlightSelection && selectedRange) {
			setHighlightSelection(false)
			handleHighlight(
				selectedRange?.startContainer,
				selectedRange?.endContainer,
				annotationsAreVisible,
				highlightColor,
			)
		} else if (selectedRange) {
			handleRemoveHighlight(selectedRange?.startContainer, selectedRange?.endContainer)
			setRanges(ranges => ranges.filter(range => range.id !== selectedRange?.id))
		}
	}

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
							onMouseUp={(e: MouseEvent) => {
								setAnchorEl(e.currentTarget as HTMLSpanElement)
								setPopOverIsOpen(true)
							}}
						>
							<Word
								word={word}
								wordIndex={wordIndex}
								passageIndex={passageIndex}
								chapterIndex={chapterIndex}
							/>
						</span>
						{popOverIsOpen && (
							<ClickAwayListener onClickAway={handleClosePopOver}>
								<Popover
									id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}-popover`}
									open={popOverIsOpen}
									anchorEl={anchorEl}
									onClose={handleClosePopOver}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'center',
									}}
									transformOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									elevation={1}
								>
									{annotationsAreVisible && (
										<>
											<Highlight
												style={{ m: 0.5 }}
												iconProps={{ size: 'small', color: 'inherit' }}
												buttonType="highlight"
												setHighlightSelection={setHighlightSelection}
											/>
											<Box component="span" sx={{ borderRight: 1 }} />
											<IconButton size="small" color="inherit" sx={{ m: 0.5 }}>
												<CommentIcon />
											</IconButton>
											<Box component="span" sx={{ borderRight: 1 }} />
										</>
									)}
									<IconButton color="inherit" size="small" sx={{ m: 0.5 }}>
										<CampaignIcon />
									</IconButton>
								</Popover>
							</ClickAwayListener>
						)}
					</Fragment>
				),
			)}
			<br id={`passage-line-break-${passageIndex}`} />
		</Fragment>
	)
}

export default Passage
