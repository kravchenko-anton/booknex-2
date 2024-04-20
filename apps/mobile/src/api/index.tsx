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

export const mobileServerURL = 'https://booknex-server.up.railway.app'

const baseParameters = {
	basePath: mobileServerURL,
	isJsonMime: () => true
}
const auth = new AuthApi(baseParameters, mobileServerURL, undefined)

const book = new BookApi(baseParameters, mobileServerURL, instance)

const catalog = new CatalogApi(baseParameters, mobileServerURL, instance)

const ebook = new EbookApi(baseParameters, mobileServerURL, instance)

const genre = new GenreApi(baseParameters, mobileServerURL, instance)

const parser = new ParserApi(baseParameters, mobileServerURL, instance)

const recommendation = new RecommendationApi(
	baseParameters,
	mobileServerURL,
	instance
)

const review = new ReviewApi(baseParameters, mobileServerURL, instance)

const storage = new StorageApi(baseParameters, mobileServerURL, instance)

const user = new UserApi(baseParameters, mobileServerURL, instance)

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
