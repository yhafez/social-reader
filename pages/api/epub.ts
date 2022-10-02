// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import EPub from 'epub2'
import path from 'path'
import fs from 'fs'
import { htmlToText } from 'html-to-text'
import { v4 as generateUuid } from 'uuid'

export interface IChapterImage {
	uuid: string
	src: string
	alt: string
}

export interface IParsedChapter {
	text: string
	images: IChapterImage[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const epub = await EPub.createAsync(
				path.join(process.cwd(), 'public') + '/alices-adventures-in-wonderland.epub',
			)
			const chapterKeys: string[] = epub.flow.map(chapter => (chapter.id ? chapter.id : ''))

			const chapters: IParsedChapter[] = []

			for (const chapterKey of chapterKeys) {
				let chapter = await epub.getChapterRawAsync(chapterKey)

				const chapterImages: IChapterImage[] = []
				const matchesImg = chapter.match(/<img([\w\W]+?)\/>/g) || []

				matchesImg?.map(imgMatch => {
					const uuid = generateUuid()
					const matchesSrc = imgMatch.match(/src="([^"]+)"/) || []
					const matchesAlt = imgMatch.match(/alt="([^"]+)"/) || []

					if (matchesSrc[1] && matchesAlt[1]) {
						chapterImages.push({ uuid, src: '/' + matchesSrc[1], alt: matchesAlt[1] })

						chapter = chapter.replace(imgMatch, `@${uuid}@`)
					}
				})

				if (chapterKey.includes('title'))
					chapters.push({
						text: chapter,
						images: chapterImages,
					})
				else
					chapters.push({
						text: htmlToText(chapter, {
							preserveNewlines: true,
							selectors: [{ selector: 'img', format: 'skip' }],
						}),
						images: chapterImages,
					})
			}

			const fileKeys = Object.keys(epub.manifest)
			for (const fileKey of fileKeys) {
				const fileName = epub.manifest[fileKey].href
				await epub.getFile(fileKey, (error, file) => {
					if (file) fs.appendFileSync(path.join(process.cwd(), 'public/') + fileName, file)
				})
			}

			res.status(200).json({ chapters })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error })
		}
	}
}
