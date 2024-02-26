import prettify from '@liquify/prettify'
import { HttpStatus } from '@nestjs/common'
import EPub from 'epub2'
import { JSDOM } from 'jsdom'
import {
	AdminErrors,
	GlobalErrorsEnum
} from '../../../../../libs/global/errors'
import { serverError } from '../../utils/helpers/call-error'
import type { UnfoldOutput } from '../parser.model'

export interface ChapterType {
	id: number
	name: string
	text: string
}
export const updatedContent = async (text: string) => {
	const dom = new JSDOM(String(text))

	const elements = dom.window.document.querySelectorAll('*')
	for (const element of elements) {
		if (
			element.textContent === '' ||
			element.textContent === ' ' ||
			element.textContent === '\n' ||
			!element.textContent ||
			element.textContent === '\n\n'
		) {
			element.remove()
		}
		const attributes = element.getAttributeNames()
		for (const attribute of attributes) {
			element.removeAttribute(attribute)
		}
		if (element.tagName === 'image') element.remove()
		if (element.tagName === 'img') element.remove()
		if (element.tagName === 'svg') element.remove()
		if (element.tagName === 'iframe') element.remove()
		if (element.tagName === 'script') element.remove()
		if (element.tagName === 'style') element.remove()
		if (element.tagName === 'table') element.remove()
		if (element.tagName === 'SUP') element.remove()
		if (element.tagName === 'SUB') element.remove()
	}
	return prettify
		.format(dom.window.document.body?.innerHTML || '', {
			language: 'html',
			indentSize: 2,
			endNewline: true
		})
		.then((formatted: string) => formatted)
}

export const getEbook = async (buffer: Buffer) =>
	new Promise(resolve => {
		const epub = new EPub(buffer as unknown as string)
		epub.on('end', function () {
			const flow: Promise<ChapterType | null>[] = epub.flow.map(
				(chapter, index) =>
					new Promise<ChapterType | null>(resolve => {
						try {
							if (!chapter.id) return
							epub.getChapter(chapter.id, async (error, text) => {
								if (error) return null

								const finalContent = await updatedContent(text)
								resolve({
									id: index + 1,
									name: String(chapter.title),
									text: finalContent
								})
								return null
							})
						} catch {
							throw serverError(
								HttpStatus.BAD_REQUEST,
								AdminErrors.invalidChapter
							)
						}
					})
			)
			Promise.all(flow)
				.then((chapters: (ChapterType | null)[]) => {
					const validChapters = chapters.filter(
						chapter => chapter?.text !== null
					)

					resolve(
						validChapters.map((chapter, index) => ({
							id: index + 1,
							name: chapter?.name || '',
							text: chapter?.text || ''
						}))
					)
				})
				.catch(() =>
					serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
				)
		})
		epub.parse()
	}) as unknown as UnfoldOutput[]
