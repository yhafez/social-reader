import { Box } from '@mui/material'

import useBoundStore from '../store'
import Passage from './Passage'

const ChapterView = () => {
	const {
		computed: { chapterContent, chapterIndex, passages },
	} = useBoundStore()

	if (!passages?.length)
		return (
			<Box
				id={`chapter-${chapterIndex}-container`}
				height="100%"
				width="100%"
				position="relative"
				overflow="scroll"
				display="flex"
				justifyContent="center"
				sx={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}
				dangerouslySetInnerHTML={{
					__html: chapterContent?.slice(
						chapterContent?.indexOf('<body'),
						chapterContent?.indexOf('</body>') + 7,
					),
				}}
			/>
		)

	return (
		<Box
			id={`chapter-${chapterIndex}-container`}
			height="100%"
			width="100%"
			position="relative"
			overflow="scroll"
			sx={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				msOverflowStyle: 'none',
				scrollbarWidth: 'none',
			}}
		>
			{passages &&
				passages.map(passage => (
					<Passage key={`passage-${passage.index}-container`} passage={passage} />
				))}
		</Box>
	)
}

export default ChapterView
