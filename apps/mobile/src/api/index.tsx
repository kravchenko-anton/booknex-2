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
import { emulatorServerURL } from 'global/api-config'
import { instance } from './interceptors'

const baseParams = {
	basePath: emulatorServerURL,
	isJsonMime: () => true
}
const auth = new AuthApi(baseParams, emulatorServerURL, undefined)

const book = new BookApi(baseParams, emulatorServerURL, instance)

const catalog = new CatalogApi(baseParams, emulatorServerURL, instance)

const ebook = new EbookApi(baseParams, emulatorServerURL, instance)

const genre = new GenreApi(baseParams, emulatorServerURL, instance)

const parser = new ParserApi(baseParams, emulatorServerURL, instance)

const recommendation = new RecommendationApi(
	baseParams,
	emulatorServerURL,
	instance
)

const review = new ReviewApi(baseParams, emulatorServerURL, instance)

const storage = new StorageApi(baseParams, emulatorServerURL, instance)

const user = new UserApi(baseParams, emulatorServerURL, instance)

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
