import { BadRequestException, Injectable } from '@nestjs/common'
import EPub from 'epub2'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import type { UnfoldOutput } from '../../../../libs/global/services-types/parser-types'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'
import type { ParserDto } from './dto/parser.dto'

const parseSelectors = {
	title: 'div.BookPageTitleSection > div > h1',
	author: 'div.FeaturedPerson__infoPrimary > h4 > a > span',
	description:
		'div.BookPageMetadataSection > div.BookPageMetadataSection__description > div > div.TruncatedContent__text.TruncatedContent__text--large > div > div > span',
	ratingCount: '[data-testid="ratingsCount"]',
	pages: '[data-testid="pagesFormat"]',
	picture: 'div.BookPage__bookCover > div > div > div > div > div > div > img',
	genres:
		'div.BookPageMetadataSection > div.BookPageMetadataSection__genres > ul'
}

export const ignoredManifest = [
	'https://pagead2.googlesyndication.com',
	'https://creativecdn.com',
	'https://www.googletagmanager.com',
	'https://cdn.krxd.net',
	'https://adservice.google.com',
	'https://cdn.concert.io',
	'https://z.moatads.com',
	'https://cdn.permutive.com'
]
interface Chapter {
	id: number
	title: string
	content: string
}

@Injectable()
export class ParserService {
	constructor(private readonly prisma: PrismaService) {}

	async all(searchTerm: string, page: number) {
		const perPage = 20
		return {
			data: await this.prisma.bookTemplate.findMany({
				take: perPage,
				select: {
					...defaultReturnObject,
					title: true,
					pages: true,
					description: true,
					author: true,
					genres: true,
					picture: true,
					popularity: true
				},
				...(page && {
					skip: page * perPage
				}),
				...(searchTerm && {
					where: {
						OR: [
							{
								author: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							},
							{
								title: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						]
					}
				})
			}),
			canLoadMore:
				page < Math.floor((await this.prisma.bookTemplate.count()) / perPage),
			totalPages: Math.floor((await this.prisma.bookTemplate.count()) / perPage)
		}
	}

	async delete(id: number) {
		return this.prisma.bookTemplate.delete({
			where: {
				id
			}
		})
	}

	async unfold(file: Express.Multer.File) {
		if (!file.buffer && file.mimetype !== 'application/epub+zip')
			throw new BadRequestException(ErrorsEnum.INVALID_FILE)
		return new Promise(resolve => {
			const epub = new EPub(file.buffer as unknown as string)
			epub.on('end', function () {
				const flow: Promise<Chapter | null>[] = epub.flow.map(
					(chapter, index) => {
						return new Promise<Chapter | null>(resolve => {
							try {
								epub.getChapter(chapter.id, (error, text) => {
									if (error) {
										return null
									}

									const updatedContent = () => {
										const dom = new JSDOM(text.toString())
										const elements = dom.window.document.querySelectorAll('*')
										for (const element of elements) {
											if (
												element.textContent === '' ||
												element.textContent === ' ' ||
												element.textContent === '\n'
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
											if (element.tagName === 'a') {
												const span = dom.window.document.createElement('span')
												span.textContent = element.textContent
												element.replaceWith(span)
											}
										}

										return dom.serialize()
									}

									const finalContent = updatedContent()

									resolve({
										id: index + 1,
										title: chapter.title,
										content: finalContent
											.replaceAll(/<(\/)?(body|html|head|div).*?>/g, '')
											.trim()
											.replaceAll(/\n{2,}/g, '\n')
									})
								})
							} catch (error) {
								console.log(error)
								new BadRequestException(ErrorsEnum.INVALID_FILE + ' chapter')
							}
						})
					}
				)
				Promise.all(flow)
					.then((chapters: (Chapter | null)[]) => {
						const validChapters = chapters.filter(
							chapter => chapter?.content !== null
						)
						resolve(
							validChapters.map((chapter, index) => {
								return {
									id: index + 1,
									title: chapter.title || '',
									content: chapter.content || ''
								}
							})
						)
					})
					.catch(error => {
						throw new BadRequestException(error)
					})
			})
			epub.parse()
		}).catch(error => {
			throw new BadRequestException(error)
		}) as Promise<UnfoldOutput>
	}

	async byId(id: number) {
		return this.prisma.bookTemplate.findUnique({
			where: {
				id
			},
			select: {
				...defaultReturnObject,
				title: true,
				pages: true,
				description: true,
				author: true,
				picture: true,
				genres: true,
				popularity: true
			}
		})
	}

	async parse(dto: ParserDto) {
		try {
			const bookTemplate = await this.prisma.bookTemplate.findMany({
				select: {
					title: true
				}
			})
			const browser = await puppeteer.launch({
				headless: false,
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
				ignoreHTTPSErrors: true,
				ignoreDefaultArgs: ['--disable-extensions']
			})
			const page = await browser.newPage()
			page.setDefaultNavigationTimeout(0)
			page.setDefaultTimeout(0)
			await page.setRequestInterception(true)
			page.on('request', request => {
				if (
					request.resourceType() === 'media' ||
					request.resourceType() === 'font' ||
					request.resourceType() === 'stylesheet' ||
					request.resourceType() === 'manifest' ||
					ignoredManifest.some(d => request.url().startsWith(d))
				) {
					request.abort()
				} else {
					request.continue()
				}
			})
			await page
				.goto(dto.url + '?page=' + dto.page, {
					waitUntil: 'domcontentloaded'
				})
				.catch(() => {})
			await page.waitForSelector('.tableList')
			const books = await page.evaluate(() => {
				const books = document.querySelectorAll('.tableList tr')
				return [...books].map((book, index) => {
					const link = book.querySelector('.bookTitle').getAttribute('href')
					const ratingAvg = book.querySelector('.minirating')
					return {
						id: index++,
						link: `https://www.goodreads.com${link}`,
						ratingAvg: ratingAvg.textContent
							? Number.parseFloat(
									ratingAvg.textContent
										.split('—')[0]
										.replaceAll('avg rating', '')
								)
							: 2.5
					}
				})
			})

			for (const book of books) {
				try {
					await page
						.goto(book.link, {
							waitUntil: 'domcontentloaded'
						})
						.catch(() => {})

					await page.waitForSelector(parseSelectors.title)
					await page.waitForSelector(parseSelectors.author)
					await page.waitForSelector(parseSelectors.description)
					await page.waitForSelector(parseSelectors.ratingCount)
					await page.waitForSelector(parseSelectors.pages)
					await page.waitForSelector(parseSelectors.picture)

					await page.waitForSelector(
						parseSelectors.genres +
							' > span:nth-child(1) > span > a > .Button__labelItem'
					)

					const title = await page.evaluate(() => {
						const title = document.querySelector(
							'div.BookPageTitleSection > div > h1'
						)
						return title.textContent ?? 'No title'
					})
					const author = await page.evaluate(() => {
						const author = document.querySelector(
							'div.FeaturedPerson__infoPrimary > h4 > a > span'
						)
						return {
							name: author.textContent ?? 'No author name'
						}
					})

					const description = await page.evaluate(selector => {
						const description = document.querySelector(selector)
						return description.textContent
							? description.textContent.replaceAll(
									/(Librarian's note|Contributor note|See also).*?\./g,
									''
								)
							: 'No description'
					}, parseSelectors.description)
					const rating = await page.evaluate(selector => {
						const ratingCount = document.querySelector(selector)
						return ratingCount.textContent
							? Number.parseInt(
									ratingCount.textContent
										.replaceAll('ratings', '')
										.replaceAll(',', '')
										.trim()
								)
							: 0
					}, parseSelectors.ratingCount)
					const pages = await page.evaluate(selector => {
						const pages = document.querySelector(selector)
						return pages.textContent
							? Number.parseInt(
									pages.textContent.replaceAll(/[^\d\s,]/g, '').trim()
								)
							: 0
					}, parseSelectors.pages)
					const picture = await page.evaluate(selector => {
						const picture = document.querySelector(selector)
						return picture.getAttribute('src') ?? 'No picture'
					}, parseSelectors.picture)

					const genres = await page.evaluate(selector => {
						const genres = document.querySelectorAll(
							selector + ' > span:nth-child(1) > span > a > .Button__labelItem'
						)
						return [...genres].map(genre => genre.textContent) ?? ['No genres']
					}, parseSelectors.genres)
					if (rating < 40_000) continue
					if (bookTemplate.some(b => b.title === title.trim())) continue
					const goodGenres = await this.prisma.genre.findMany({
						where: {
							OR: genres.map(genre => {
								return {
									name: {
										contains: genre,
										mode: 'insensitive'
									}
								}
							})
						}
					})
					await this.prisma.bookTemplate.create({
						data: {
							title: title.trim(),
							author: author.name,
							description,
							picture,
							pages,
							genres: {
								connect: goodGenres.map(genre => {
									return {
										name: genre.name
									}
								})
							},
							popularity: rating
						}
					})
				} catch {}
			}
			await page.close()
			await browser.close()
		} catch {}
	}
}
