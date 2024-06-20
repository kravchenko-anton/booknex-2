import {
	AuthApi,
	BookApi,
	CatalogApi,
	EbookApi,
	GenreApi,
	ParserApi,
	RecommendationApi,
	StorageApi,
	UserApi
} from 'global/api-client'
import { instance } from './interceptors'

export const webServerURL = process.env.SERVER_URL
console.log('webServerURL', webServerURL)
const baseParameters = {
	basePath: webServerURL,
	isJsonMime: () => true
}

const auth = new AuthApi(baseParameters, webServerURL, undefined)

const book = new BookApi(baseParameters, webServerURL, instance)

const catalog = new CatalogApi(baseParameters, webServerURL, instance)

const ebook = new EbookApi(baseParameters, webServerURL, instance)

const genre = new GenreApi(baseParameters, webServerURL, instance)

const parser = new ParserApi(baseParameters, webServerURL, instance)

const recommendation = new RecommendationApi(
	baseParameters,
	webServerURL,
	instance
)

const storage = new StorageApi(baseParameters, webServerURL, instance)

const user = new UserApi(baseParameters, webServerURL, instance)

export default {
	auth,
	book,
	catalog,
	ebook,
	genre,
	parser,
	recommendation,
	storage,
	user
}
