import { Dispatch, SetStateAction } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Close = ({
	setIsOpen,
	name,
}: {
	setIsOpen: Dispatch<SetStateAction<boolean>>
	name: string
}) => {
	return (
		<Tooltip id={`close-${name}-button-tooltip`} title={`Close ${name}`}>
			<IconButton
				id={`${name}-button`}
				onClick={() => setIsOpen(false)}
				sx={{ '&:hover': { color: 'red' } }}
			>
				<CloseIcon id="close-icon" sx={{ cursor: 'pointer' }} />
			</IconButton>
		</Tooltip>
	)
}

export default Close
