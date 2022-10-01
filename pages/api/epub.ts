// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import EPub from 'epub2'
import path from 'path'
import fs from 'fs'
import { htmlToText } from 'html-to-text'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const epub = await EPub.createAsync(
				path.join(process.cwd(), 'public') + '/alices-adventures-in-wonderland.epub',
			)
			const chapterKeys: string[] = epub.flow.map(chapter => (chapter.id ? chapter.id : ''))

			const chapters: string[] = []

			for (const chapterKey of chapterKeys) {
				const chapter = await epub.getChapterRawAsync(chapterKey)
				if (chapterKey.includes('title')) chapters.push(chapter)
				else
					chapters.push(
						htmlToText(chapter, {
							preserveNewlines: true,
							selectors: [{ selector: 'img', format: 'skip' }],
						}),
					)
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
