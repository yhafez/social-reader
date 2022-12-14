import { useState, useEffect, MouseEvent } from 'react'
import { Box, ClickAwayListener, IconButton, Popover } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'

import useBoundStore from '../store'
import { handleHighlight, handleRemoveHighlight } from '../utils/helpers'
import Highlight from './buttons/Highlight'
import ToggleTextToSpeech from './buttons/ToggleTextToSpeech'
import { IBookSelection, IWord } from '../@types'

const Word = ({ word }: { word: IWord }) => {
	const { fontSize, highlightColor, highlightHoverColor, annotationsAreVisible } = useBoundStore()
	const { chapterIndex, passageIndex, index: wordIndex, content } = word

	const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null)
	const [ranges, setRanges] = useState<IBookSelection[]>([])
	const [selectedRange, setSelectedRange] = useState<IBookSelection | null>(null)
	const [popOverIsOpen, setPopOverIsOpen] = useState(false)

	useEffect(() => {
		ranges.forEach(range => {
			if (range?.id === selectedRange?.id) {
				handleHighlight(
					range?.startContainer,
					range?.endContainer,
					annotationsAreVisible,
					highlightHoverColor,
					true,
				)
			} else {
				handleHighlight(
					range?.startContainer,
					range?.endContainer,
					annotationsAreVisible,
					highlightColor,
				)
			}
		})
	}, [ranges, annotationsAreVisible, highlightColor, selectedRange, highlightHoverColor])

	const handleClosePopOver = (highlightSelection: boolean) => {
		setPopOverIsOpen(false)
		setAnchorEl(null)
		if (highlightSelection && selectedRange) {
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
		document.querySelectorAll('.highlight').forEach(el => el.classList.remove('selected'))
	}

	const handleHover = (e: MouseEvent, currentlyHovering: boolean) => {
		if (!annotationsAreVisible) return
		const hoveredElement = e.target as HTMLElement

		if (currentlyHovering && hoveredElement.className.includes('-to-')) {
			const querySelector: string =
				'.' + hoveredElement.className.split(' ').find(className => className.includes('-to-'))

			const highlightedSelectionElements: NodeListOf<HTMLElement> =
				document.querySelectorAll(querySelector)
			highlightedSelectionElements.forEach(element => {
				element.style.backgroundColor = highlightHoverColor
				element.style.cursor = 'pointer'
			})
		} else if (!currentlyHovering && hoveredElement.className.includes('-to-')) {
			const highlightedSelectionElements: NodeListOf<HTMLElement> = document.querySelectorAll(
				'.' + hoveredElement.className.split(' ')[1],
			)
			highlightedSelectionElements.forEach(element => {
				element.style.backgroundColor = element.className.includes('selected')
					? highlightHoverColor
					: highlightColor
				element.style.cursor = 'default'
			})
		}
	}

	const handleSelection = (e: MouseEvent) => {
		setAnchorEl(e.currentTarget as HTMLSpanElement)
		setPopOverIsOpen(true)

		const selObj = window.getSelection() || new Selection()
		const rangeObj = selObj?.getRangeAt(0) as IBookSelection

		if (
			rangeObj &&
			rangeObj?.startContainer?.nodeName === '#text' &&
			rangeObj?.endContainer?.nodeName === '#text' &&
			rangeObj?.startContainer?.parentElement &&
			rangeObj?.endContainer?.parentElement
		) {
			rangeObj.id = `${rangeObj.startContainer.parentElement.id}-to-${rangeObj.endContainer.parentElement.id}`
			setRanges([...ranges, rangeObj])
			setSelectedRange(rangeObj)
		}
	}

	return (
		<>
			<span
				id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}`}
				onMouseEnter={e => handleHover(e, true)}
				onMouseLeave={e => handleHover(e, false)}
				style={{
					fontSize: `${fontSize}px`,
				}}
				onMouseUp={handleSelection}
			>
				{content}
			</span>
			<span
				id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}-space`}
				style={{
					fontSize: `${fontSize}px`,
				}}
			>
				{' '}
			</span>
			{popOverIsOpen && (
				<ClickAwayListener onClickAway={() => handleClosePopOver(false)}>
					<Popover
						id={`chapter-${chapterIndex}-passage-${passageIndex}-word-${wordIndex}-popover`}
						open={popOverIsOpen}
						anchorEl={anchorEl}
						onClose={() => handleClosePopOver(false)}
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
									handleClosePopOver={handleClosePopOver}
								/>
								<Box component="span" sx={{ borderRight: 1 }} />
								<IconButton size="small" color="inherit" sx={{ m: 0.5 }}>
									<CommentIcon />
								</IconButton>
								<Box component="span" sx={{ borderRight: 1 }} />
							</>
						)}
						<ToggleTextToSpeech
							buttonType="read"
							iconProps={{ color: 'inherit', size: 'small' }}
							style={{ m: 0.5 }}
						/>
					</Popover>
				</ClickAwayListener>
			)}
		</>
	)
}

export default Word
