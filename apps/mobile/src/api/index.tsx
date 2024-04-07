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
import { serverURL } from 'global/api-config'
import { instance } from './interceptors'

const baseParams = {
	basePath: serverURL,
	isJsonMime: () => true
}
const auth = new AuthApi(baseParams, serverURL, undefined)

const book = new BookApi(baseParams, serverURL, instance)

const catalog = new CatalogApi(baseParams, serverURL, instance)

const ebook = new EbookApi(baseParams, serverURL, instance)

const genre = new GenreApi(baseParams, serverURL, instance)

const parser = new ParserApi(baseParams, serverURL, instance)

const recommendation = new RecommendationApi(baseParams, serverURL, instance)

const review = new ReviewApi(baseParams, serverURL, instance)

const storage = new StorageApi(baseParams, serverURL, instance)

const user = new UserApi(baseParams, serverURL, instance)

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
