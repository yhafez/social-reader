// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import EPub from 'epub2'
import path from 'path'
import fs from 'fs'
import { htmlToText } from 'html-to-text'
import { v4 as generateUuid } from 'uuid'
import { IPassage, IChapterImage } from '../../@types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const epub = await EPub.createAsync(
				path.join(process.cwd(), 'public') + '/alices-adventures-in-wonderland.epub',
			)

			const chaptersPromises =
				epub.flow.map(async (chapter, chapterIndex) => {
					try {
						let chapterContent = ''
						if (chapter.id) chapterContent = await epub.getChapterRawAsync(chapter.id)

						const chapterImages: IChapterImage[] = []

						const matchesImg = chapterContent.match(/<img([\w\W]+?)\/>/g) || []

						matchesImg?.map(imgMatch => {
							const uuid = generateUuid()
							const matchesSrc = imgMatch.match(/src="([^"]+)"/) || []
							const matchesAlt = imgMatch.match(/alt="([^"]+)"/) || []

							if (matchesSrc[1] && matchesAlt[1]) {
								chapterImages.push({
									chapterIndex,
									uuid,
									src: '/' + matchesSrc[1],
									alt: matchesAlt[1],
								})

								chapterContent = chapterContent.replace(imgMatch, `@${uuid}@`)
							}
						})

						const passages: IPassage[] | null = !chapter.id?.startsWith('chapter')
							? null
							: htmlToText(chapterContent, {
									preserveNewlines: true,
									selectors: [{ selector: 'img', format: 'skip' }],
							  })
									.split('\n\n')
									?.map((passageContent, passageIndex) => ({
										index: passageIndex,
										bookUUID: epub.metadata.UUID || null,
										chapterIndex,
										content: passageContent,
										isHighlighted: false,
										words:
											passageContent.split(/\s+/g).map((word, wordIndex) => ({
												index: wordIndex,
												bookUUID: epub.metadata.UUID || null,
												chapterIndex,
												passageIndex,
												content: word,
												isHighlighted: false,
											})) || null,
									})) || null

						return {
							id: chapter.id,
							index: chapterIndex,
							title: chapter.title,
							content: chapter?.id?.includes('title')
								? chapterContent
								: htmlToText(chapterContent, {
										preserveNewlines: true,
										selectors: [{ selector: 'img', format: 'skip' }],
								  }),
							passages,
							bookUUID: epub.metadata.UUID,
							href: chapter.href,
							images: chapterImages,
						}
					} catch (error) {
						console.error(error)
					}
				}) || []

			const chapters = await Promise.all(chaptersPromises)

			const book = {
				...epub.metadata,
				chapters,
			}

			const fileKeys = Object.keys(epub.manifest)
			for (const fileKey of fileKeys) {
				const fileName = epub.manifest[fileKey].href
				await epub.getFile(fileKey, (error, file) => {
					if (file) fs.appendFileSync(path.join(process.cwd(), 'public/') + fileName, file)
				})
			}

			res.status(200).json(book)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error })
		}
	}
}
