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

const baseParams = {
	basePath: mobileServerURL,
	isJsonMime: () => true
}
const auth = new AuthApi(baseParams, mobileServerURL, undefined)

const book = new BookApi(baseParams, mobileServerURL, instance)

const catalog = new CatalogApi(baseParams, mobileServerURL, instance)

const ebook = new EbookApi(baseParams, mobileServerURL, instance)

const genre = new GenreApi(baseParams, mobileServerURL, instance)

const parser = new ParserApi(baseParams, mobileServerURL, instance)

const recommendation = new RecommendationApi(
	baseParams,
	mobileServerURL,
	instance
)

const review = new ReviewApi(baseParams, mobileServerURL, instance)

const storage = new StorageApi(baseParams, mobileServerURL, instance)

const user = new UserApi(baseParams, mobileServerURL, instance)

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
