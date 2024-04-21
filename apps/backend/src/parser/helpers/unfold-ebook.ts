import type { BaseChapter } from '@/src/book/ebook/ebook.model'
import prettify from '@liquify/prettify'
import { HttpStatus } from '@nestjs/common'
import EPub from 'epub2'
import { adminErrors, globalErrors } from 'global/errors'
import { JSDOM } from 'jsdom'
import { serverError } from '../../utils/helpers/server-error'

export const clearHtmlElement = (element: Element) => {
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
	if (element.tagName === 'TABLE') element.remove()
	if (element.tagName === 'SUP') element.remove()
	if (element.tagName === 'SUB') element.remove()
	if (element.tagName === 'hr') element.remove()
	if (element.tagName === 'HR') element.remove()

	return element
}

export const updatedContent = async (text: string) => {
	const dom = new JSDOM(String(text))

	const clearElements = dom.window.document.querySelectorAll('*')
	const elements = [...clearElements].map(element => clearHtmlElement(element))
	for (const element of elements) {
		if (
			(element.tagName === 'a' ||
				element.tagName === 'A' ||
				element.tagName === 'p' ||
				element.tagName === 'P') &&
			element.childElementCount > 1
		) {
			const div = dom.window.document.createElement('div')
			div.innerHTML = element.innerHTML
			element.replaceWith(div)
		}
	}
	if (!prettify.format) {
		throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
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
			const flow: Promise<BaseChapter | null>[] = epub.flow.map(
				(chapter, index) =>
					new Promise<BaseChapter | null>(resolve => {
						try {
							if (!chapter.id) return
							epub.getChapter(chapter.id, async (error, text) => {
								if (error) return null
								if (!text) return null
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
								adminErrors.invalidChapter
							)
						}
					})
			)
			Promise.all(flow)
				.then((chapters: (BaseChapter | null)[]) => {
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
					serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
				)
		})
		epub.parse()
	}) as unknown as BaseChapter[]
