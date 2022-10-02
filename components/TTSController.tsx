import { useContext, Dispatch, SetStateAction } from 'react'
import { Box } from '@mui/material'

import Close from './buttons/Close'
import ChangeVoice from './buttons/ChangeVoice'
import { ThemeContext } from '../context/ThemeContext'

const TTSController = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
	const { isDarkMode } = useContext(ThemeContext)

	return (
		<Box
			display="flex"
			position="absolute"
			right={12}
			bottom={48}
			borderRadius="4px"
			sx={{
				backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
			}}
		>
			<ChangeVoice />
			<Close name="tts-controller" setIsOpen={setIsOpen} />
		</Box>
	)
}

export default TTSController
