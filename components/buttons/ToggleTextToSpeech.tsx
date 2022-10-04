import { useEffect, useContext } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'

import TTSController from '../TTSController'
import { BookViewerContext } from '../../context/BookViewerContext'
import { IBookSelection } from '../ChapterView'
import { readUtterance } from '../../utils/helpers'

const ToggleTextToSpeech = ({
	buttonType,
	style,
	iconProps,
}: {
	buttonType: 'toggle' | 'read'
	style?: { [key: string]: any }
	iconProps?: { [key: string]: any }
}) => {
	const {
		ttsIsOpen,
		setTtsIsOpen,
		pitch,
		rate,
		volume,
		voice,
		speech,
		passages,
		setIsPlaying,
		setPassageBeingRead,
	} = useContext(BookViewerContext)

	useEffect(() => {
		const storedTTSIsOpen = localStorage.getItem('ttsIsOpen')
		if (storedTTSIsOpen) setTtsIsOpen(JSON.parse(storedTTSIsOpen))
	}, [setTtsIsOpen])

	const handleClick = () => {
		if (buttonType === 'toggle') {
			localStorage.setItem('ttsIsOpen', JSON.stringify(!ttsIsOpen))
			setTtsIsOpen(open => !open)
		} else {
			const selObj = window.getSelection()
			const range = selObj?.getRangeAt(0) as IBookSelection
			const firstPassageIndex = range?.id?.slice(
				range?.id?.search(/passage-([\w\W]+?)-/) + 8,
				range?.id?.search('-word'),
			)
			const firstWordIndex = range?.id?.slice(
				range?.id?.search(/word([\w\W]+?)-/) + 5,
				range?.id?.search('-to-'),
			)

			readUtterance(
				volume,
				rate,
				pitch,
				voice,
				speech,
				passages,
				+firstPassageIndex,
				setIsPlaying,
				setPassageBeingRead,
				+firstWordIndex,
			)
		}
	}

	return (
		<>
			<Tooltip id="text-to-speech-button-tooltip" title="Text-to-Speech">
				<IconButton
					id="text-to-speech-button"
					onClick={handleClick}
					color={iconProps?.color ? iconProps.color : ttsIsOpen ? 'primary' : 'inherit'}
					sx={{ ...style }}
				>
					<CampaignIcon id="voices-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			</Tooltip>
			{ttsIsOpen && <TTSController setIsOpen={setTtsIsOpen} />}
		</>
	)
}

export default ToggleTextToSpeech
