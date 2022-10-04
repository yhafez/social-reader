import { useContext } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { IconButton, Tooltip } from '@mui/material'

import { BookViewerContext } from '../../context/BookViewerContext'
import { readUtterance } from '../../utils/helpers'

const PlayPause = () => {
	const {
		isPlaying,
		setIsPlaying,
		speech,
		volume,
		rate,
		pitch,
		voice,
		passages,
		setPassageBeingRead,
	} = useContext(BookViewerContext)

	const handlePlay = () => {
		if (speech.speaking()) speech.resume()
		readUtterance(
			volume,
			rate,
			pitch,
			voice,
			speech,
			passages,
			0,
			setIsPlaying,
			setPassageBeingRead,
		)
	}

	const handlePause = () => {
		setIsPlaying(false)
		speech.pause()
	}

	return isPlaying ? (
		<Tooltip id="pause-audio-tooltip" title="Pause text-to-speech">
			<IconButton id="pause-audio-button" color="inherit" onClick={handlePause}>
				<PauseIcon id="pause-audio-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	) : (
		<Tooltip id="play-audio-tooltip" title="Play text-to-speech">
			<IconButton id="play-audio-button" color="inherit" onClick={handlePlay}>
				<PlayArrowIcon id="play-audio-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default PlayPause
