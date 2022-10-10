import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { IconButton, Tooltip } from '@mui/material'

import useBoundStore from '../../store'
import { readUtterance } from '../../utils/helpers'

const PlayPause = () => {
	const {
		ttsIsPlaying,
		setTtsIsPlaying,
		speech,
		volume,
		rate,
		pitch,
		voice,
		setTtsPassageBeingRead,
		computed: { passages },
	} = useBoundStore()

	const handlePlay = () => {
		if (speech?.speaking) speech?.resume()
		readUtterance(
			volume,
			rate,
			pitch,
			voice,
			speech,
			passages && passages.length > 0 ? passages : [],
			0,
			setTtsIsPlaying,
			setTtsPassageBeingRead,
		)
	}

	const handlePause = () => {
		setTtsIsPlaying(false)
		speech?.pause()
	}

	return ttsIsPlaying ? (
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
