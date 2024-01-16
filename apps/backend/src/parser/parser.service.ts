import type { UnfoldOutput } from '@booknex/global/services-types/parser-types'
import { BadRequestException, Injectable } from '@nestjs/common'
import EPub from 'epub2'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import { defaultReturnObject } from '../utils/return.default.object'
import type { ParserDto } from './dto/parser.dto'

interface Chapter {
	id: string
	title: string
	content: string
}

@Injectable()
export class ParserService {
	constructor(private readonly prisma: PrismaService) {}

	async all(searchTerm: string, page: number) {
		const perPage = 20
		return {
			data: await this.prisma.goodReadBook.findMany({
				take: perPage,
				select: {
					...defaultReturnObject,
					title: true,
					pages: true,
					description: true,
					authorPicture: true,
					authorDescription: true,
					authorName: true,
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
								title: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							},
							{
								authorName: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							},
							{
								authorDescription: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							},
							{
								description: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						]
					}
				})
			}),
			canLoadMore:
				page < Math.floor((await this.prisma.goodReadBook.count()) / perPage),
			totalPages: Math.floor((await this.prisma.goodReadBook.count()) / perPage)
		}
	}

	async delete(id: number) {
		return this.prisma.goodReadBook.delete({
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
				const flow: Promise<Chapter | null>[] = epub.flow.map(chapter => {
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
										if (element.tagName === 'image') {
											element.remove()
										}
										if (element.tagName === 'img') {
											element.remove()
										}
										if (element.tagName === 'svg') {
											element.remove()
										}
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
									id: chapter.id,
									title: chapter.title,
									content: finalContent
										.replaceAll(/<(\/)?(body|html|head).*?>/g, '')
										.trim()
										.replaceAll(/\n{2,}/g, '\n')
								})
							})
						} catch (error) {
							console.log(error)
							new BadRequestException(ErrorsEnum.INVALID_FILE + ' chapter')
						}
					})
				})
				Promise.all(flow)
					.then((chapters: (Chapter | null)[]) => {
						const validChapters = chapters.filter(
							chapter => chapter?.content !== null
						)
						resolve(
							validChapters.map((chapter, index) => {
								return {
									id: (index + 1).toString(),
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

	async parse(dto: ParserDto) {
		try {
			const goodReadBook = await this.prisma.goodReadBook.findMany({
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
			page.on('requestfailed', request => {})
			page.on('request', request => {
				if (
					request.resourceType() === 'media' ||
					request.resourceType() === 'font' ||
					request.resourceType() === 'stylesheet' ||
					request.resourceType() === 'manifest' ||
					[
						'https://pagead2.googlesyndication.com',
						'https://creativecdn.com',
						'https://www.googletagmanager.com',
						'https://cdn.krxd.net',
						'https://adservice.google.com',
						'https://cdn.concert.io',
						'https://z.moatads.com',
						'https://cdn.permutive.com'
					].some(d => request.url().startsWith(d))
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
					await page.waitForSelector('div.BookPageTitleSection > div > h1')
					await page.waitForSelector(
						'div.FeaturedPerson__infoPrimary > h4 > a > span'
					)
					await page.waitForSelector(
						'div.FeaturedPerson__profile > div.FeaturedPerson__avatar > a > img'
					)
					await page.waitForSelector(
						'div.BookPageMetadataSection > div.PageSection > div.TruncatedContent > div.TruncatedContent__text.TruncatedContent__text--medium > div > div > span'
					)
					await page.waitForSelector(
						'div.BookPageMetadataSection > div.BookPageMetadataSection__description > div > div.TruncatedContent__text.TruncatedContent__text--large > div > div > span'
					)

					await page.waitForSelector('[data-testid="ratingsCount"]')
					await page.waitForSelector('[data-testid="pagesFormat"]')

					await page.waitForSelector(
						'div.BookPage__bookCover > div > div > div > div > div > div > img'
					)

					await page.waitForSelector(
						'div.BookPageMetadataSection > div.BookPageMetadataSection__genres > ul > span:nth-child(1) > span > a > .Button__labelItem'
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
						const authorPicture = document.querySelector(
							'div.FeaturedPerson__profile > div.FeaturedPerson__avatar > a > img'
						)
						const authorDescription = document.querySelector(
							'div.BookPageMetadataSection > div.PageSection > div.TruncatedContent > div.TruncatedContent__text.TruncatedContent__text--medium > div > div > span'
						)
						return {
							name: author.textContent ?? 'No author name',
							picture: authorPicture.getAttribute('src') ?? 'No author picture',
							description: authorDescription.textContent
								? authorDescription.textContent.replaceAll(
										/(Librarian's note|Contributor note|See also).*?\./g,
										''
									)
								: 'No author description'
						}
					})

					const description = await page.evaluate(() => {
						const description = document.querySelector(
							'div.BookPageMetadataSection > div.BookPageMetadataSection__description > div > div.TruncatedContent__text.TruncatedContent__text--large > div > div > span'
						)
						return description.textContent
							? description.textContent.replaceAll(
									/(Librarian's note|Contributor note|See also).*?\./g,
									''
								)
							: 'No description'
					})
					const rating = await page.evaluate(() => {
						const selector = '[data-testid="ratingsCount"]'
						const ratingCount = document.querySelector(selector)
						return ratingCount.textContent
							? Number.parseInt(
									ratingCount.textContent
										.replaceAll('ratings', '')
										.replaceAll(',', '')
										.trim()
								)
							: 0
					})
					const pages = await page.evaluate(() => {
						const selector = '[data-testid="pagesFormat"]'
						const pages = document.querySelector(selector)
						return pages.textContent
							? Number.parseInt(
									pages.textContent.replaceAll(/[^\d\s,]/g, '').trim()
								)
							: 0
					})
					const picture = await page.evaluate(() => {
						const picture = document.querySelector(
							'div.BookPage__bookCover > div > div > div > div > div > div > img'
						)
						return picture.getAttribute('src') ?? 'No picture'
					})

					const genres = await page.evaluate(() => {
						const genres: any = document.querySelectorAll(
							'div.BookPageMetadataSection > div.BookPageMetadataSection__genres > ul > span:nth-child(1) > span > a > .Button__labelItem'
						)
						return [...genres].map(genre => genre.textContent) ?? ['No genres']
					})
					if (rating < 40_000) continue
					if (goodReadBook.some(b => b.title === title.trim())) continue
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
					await this.prisma.goodReadBook.create({
						data: {
							title: title.trim(),
							authorName: author.name,
							authorPicture: author.picture,
							authorDescription: author.description,
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
			return {
				success: true
			}
		} catch {}
	}
}
