import { Injectable } from '@nestjs/common'
import type { TocElement } from 'epub'
import EPub from 'epub'
import puppeteer from 'puppeteer'
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

	async all(searchTerm: string) {
		return this.prisma.goodReadBook.findMany({
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
		})
	}

	async delete(id: number) {
		return this.prisma.goodReadBook.delete({
			where: {
				id
			}
		})
	}

	async unfold(file: Express.Multer.File) {
		return new Promise(resolve => {
			const epub = new EPub(file.buffer as unknown as string)
			epub.on('end', function () {
				const flow: Promise<Chapter | null>[] = epub.flow.map(
					(chapter: TocElement) => {
						return new Promise<Chapter | null>((resolve, reject) => {
							epub.getChapter(chapter.id, (error, text) => {
								if (error) {
									console.log(error)
									reject(error)
									return
								}

								const content = `${
									chapter.title
										? `<section id="${chapter.title}"></section>`
										: ''
								} ${text
									.replaceAll(/ href="[^"]*"/g, '')
									.replaceAll(/ id="[^"]*"/g, '')
									.replaceAll(/ class="[^"]*"/g, '')
									.replaceAll(/ xmlns="[^"]*"/g, '')
									.replaceAll(
										/<(?!\/?(?:h[1-6]|span|div|p|i|u|abbr|address|code|q|ul|li|ol|br|strong|em|mark|a|del|sub|sup|ins|b|blockquote|cite|dfn|kbd|pre|samp|small|time|var)\b)[^>]+>/gi,
										''
									)
									.toString()}`

								resolve({
									id: chapter.id,
									title: chapter.title,
									content: content
								})
							})
						})
					}
				)
				Promise.all(flow).then((chapters: (Chapter | null)[]) => {
					const validChapters = chapters.filter(
						(chapter): chapter is Chapter => chapter.content !== null
					)
					resolve(
						validChapters.map(chapter => {
							return {
								title: chapter.title ?? chapter.id ?? 'No title',
								content: chapter.content
							}
						})
					)
				})
			})

			epub.parse()
		})
	}

	async parse(dto: ParserDto) {
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
		await page.setRequestInterception(true)

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
		page.goto(dto.url + '?page=' + dto.page, {
			waitUntil: 'domcontentloaded'
		})
		await page.waitForSelector('.tableList')
		const books = await page.evaluate(() => {
			const books = document.querySelectorAll('.tableList tr')
			// @ts-expect-error
			return [...books].map((book, index) => {
				const link = book.querySelector('.bookTitle').getAttribute('href')
				const ratingAvg = book.querySelector('.minirating')
				return {
					id: index++,
					link: `https://www.goodreads.com${link}`,
					ratingAvg: ratingAvg.textContent
						? Number.parseFloat(
								ratingAvg.textContent.split('—')[0].replaceAll('avg rating', '')
						  )
						: 2.5
				}
			})
		})

		for (let BooksIndex = 0; BooksIndex < books.length; BooksIndex++) {
			try {
				const book = books[BooksIndex]
				page.goto(book.link, {
					waitUntil: 'domcontentloaded'
				})
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
				await this.prisma.goodReadBook.create({
					data: {
						title: title.trim(),
						authorName: author.name,
						authorPicture: author.picture,
						authorDescription: author.description,
						description,
						picture,
						pages,
						genres,
						popularity: rating
					}
				})
			} catch {
				console.log(`❌ Error for ${BooksIndex + 1}/${books.length}`)
			}
		}
		await browser.close()
	}
}
