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
import { SERVER_URL } from '../utils/config'
import { instance } from './interceptors'

const baseParameters = {
	basePath: SERVER_URL,
	isJsonMime: () => true
}
const auth = new AuthApi(baseParameters, SERVER_URL, undefined)

const book = new BookApi(baseParameters, SERVER_URL, instance)

const catalog = new CatalogApi(baseParameters, SERVER_URL, instance)

const ebook = new EbookApi(baseParameters, SERVER_URL, instance)

const genre = new GenreApi(baseParameters, SERVER_URL, instance)

const parser = new ParserApi(baseParameters, SERVER_URL, instance)

const recommendation = new RecommendationApi(
	baseParameters,
	SERVER_URL,
	instance
)

const review = new ReviewApi(baseParameters, SERVER_URL, instance)

const storage = new StorageApi(baseParameters, SERVER_URL, instance)

const user = new UserApi(baseParameters, SERVER_URL, instance)

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
