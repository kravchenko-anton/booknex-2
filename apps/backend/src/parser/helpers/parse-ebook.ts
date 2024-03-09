import puppeteer, { type Page } from 'puppeteer'

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
const parseSelectors = {
	title: 'div.BookPageTitleSection > div > h1',
	author:
		'div.BookPageMetadataSection > div.BookPageMetadataSection__contributor > h3 > div > span:nth-child(1) > a > span',
	description:
		'div.BookPageMetadataSection > div.BookPageMetadataSection__description > div > div.TruncatedContent__text.TruncatedContent__text--large > div > div > span',
	ratingCount: '.RatingStatistics__rating',
	pages: '[data-testid="pagesFormat"]',
	picture: 'div.BookPage__bookCover > div > div > div > div > div > div > img',
	genres:
		'div.BookPageMetadataSection > div.BookPageMetadataSection__genres > ul'
}

export const useParser = async () => {
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

	return { page, browser }
}

export const parseBookTable = async (
	page: Page,
	url: string,
	pageToGo: number
) => {
	await page
		.goto(url + '?page=' + pageToGo, {
			waitUntil: 'domcontentloaded'
		})
		.catch(() => null)
	await page.waitForSelector('.tableList')
	return page.evaluate(() => {
		const books = document.querySelectorAll('.tableList tr')
		return [...books].map((book, index) => {
			const link = book?.querySelector('.bookTitle')?.getAttribute('href')
			const ratingAvg = book.querySelector('.minirating')
			return {
				id: index++,
				link: `https://www.goodreads.com${link}`,
				ratingAvg: ratingAvg?.textContent
					? Number.parseFloat(
							ratingAvg.textContent.split('—')[0].replaceAll('avg rating', '')
						)
					: 2.5
			}
		})
	})
}

export const parseCurrentBook = async (page: Page, url: string) => {
	await page
		.goto(url, {
			waitUntil: 'domcontentloaded'
		})
		.catch(() => null)
	console.log('go to', url)
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
	console.log('all waits done')
	const title = await page.evaluate(() => {
		const title = document.querySelector('div.BookPageTitleSection > div > h1')
		return title?.textContent ?? 'No title'
	})
	const author = await page.evaluate(() => {
		const author = document.querySelector(
			'div.FeaturedPerson__infoPrimary > h4 > a > span'
		)
		return {
			name: author?.textContent ?? 'No author name'
		}
	})

	const description = await page.evaluate(selector => {
		const description = document.querySelector(selector)
		return description?.textContent
			? description.textContent.replaceAll(
					/(Librarian's note|Contributor note|See also).*?\./g,
					''
				)
			: 'No description'
	}, parseSelectors.description)

	const rating = await page.evaluate(selector => {
		const ratingCount = document.querySelector(selector)
		return ratingCount?.textContent
			? Number.parseFloat(
					ratingCount.textContent
						.replaceAll('ratings', '')
						.replaceAll(',', '')
						.trim()
				)
			: 0
	}, parseSelectors.ratingCount)

	const picture = await page.evaluate(selector => {
		const picture = document.querySelector(selector)
		return picture?.getAttribute('src') ?? 'No picture'
	}, parseSelectors.picture)

	const genres = await page.evaluate(selector => {
		const genres = document.querySelectorAll(
			selector + ' > span:nth-child(1) > span > a > .Button__labelItem'
		)
		return (
			[...genres].slice(0, 3).map(genre => genre.textContent) ?? ['No genres']
		)
	}, parseSelectors.genres)

	return {
		title,
		author,
		description,
		rating,
		picture,
		genres
	}
}
