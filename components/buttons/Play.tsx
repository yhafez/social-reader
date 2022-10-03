import { useState, useEffect, useContext } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { IconButton, Tooltip } from '@mui/material'

import { BookViewerContext } from '../../context/BookViewerContext'

const Play = ({ speech }: { speech: any }) => {
	const { chapters, chapter } = useContext(BookViewerContext)
	const [isSpeaking, setIsSpeaking] = useState(false)

	const chapterText = chapters[chapter]?.text

	const handlePlay = () => {
		setIsSpeaking(true)
		if (speech.pending()) {
			speech.resume()
		} else
			speech.speak({
				text: chapterText?.replaceAll(/@([\w\W]+?)@/g, ''),
				queue: false,
				listeners: {
					onend: () => {
						setIsSpeaking(false)
					},
					onpause: () => {
						setIsSpeaking(false)
					},
					onboundary: (event: any) => {
						console.log(event)
						speech.pause()
					},
				},
			})
	}

	const handlePause = () => {
		setIsSpeaking(false)
		speech.cancel()
	}

	useEffect(() => {
		if (speech?.speaking()) {
			setIsSpeaking(true)
		}
	}, [speech])

	return (
		<Tooltip id="play-audio-tooltip" title="Select highlight color">
			{isSpeaking ? (
				<IconButton id="pause-audio-button" color="inherit" onClick={handlePause}>
					<PauseIcon id="pause-audio-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			) : (
				<IconButton id="play-audio-button" color="inherit" onClick={handlePlay}>
					<PlayArrowIcon id="play-audio-icon" sx={{ cursor: 'pointer' }} />
				</IconButton>
			)}
		</Tooltip>
	)
}

export default Play
