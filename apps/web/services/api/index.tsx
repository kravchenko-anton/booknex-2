import {
	AuthApi,
	BookApi,
	CatalogApi,
	EbookApi,
	GenreApi,
	ParserApi,
	RecommendationApi,
	ReviewApi,
	StorageApi,
	UserApi
} from 'global/api-client'
import { instance } from './interceptors'

export const webServerURL = process.env['SERVER_URL']
console.log('webServerURL', webServerURL)
const baseParams = {
	basePath: webServerURL,
	isJsonMime: () => true
}

const auth = new AuthApi(baseParams, webServerURL, undefined)

const book = new BookApi(baseParams, webServerURL, instance)

const catalog = new CatalogApi(baseParams, webServerURL, instance)

const ebook = new EbookApi(baseParams, webServerURL, instance)

const genre = new GenreApi(baseParams, webServerURL, instance)

const parser = new ParserApi(baseParams, webServerURL, instance)

const recommendation = new RecommendationApi(baseParams, webServerURL, instance)

const review = new ReviewApi(baseParams, webServerURL, instance)

const storage = new StorageApi(baseParams, webServerURL, instance)

const user = new UserApi(baseParams, webServerURL, instance)

export default {
	auth,
	book,
	catalog,
	ebook,
	genre,
	parser,
	recommendation,
	review,
	storage,
	user
}
