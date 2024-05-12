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
import Config from 'react-native-config'
import { instance } from './interceptors'

const serverUrl = Config.SERVER_URL
const baseParameters = {
	basePath: serverUrl,
	isJsonMime: () => true
}
const auth = new AuthApi(baseParameters, serverUrl, undefined)

const book = new BookApi(baseParameters, serverUrl, instance)

const catalog = new CatalogApi(baseParameters, serverUrl, instance)

const ebook = new EbookApi(baseParameters, serverUrl, instance)

const genre = new GenreApi(baseParameters, serverUrl, instance)

const parser = new ParserApi(baseParameters, serverUrl, instance)

const recommendation = new RecommendationApi(
	baseParameters,
	serverUrl,
	instance
)

const review = new ReviewApi(baseParameters, serverUrl, instance)

const storage = new StorageApi(baseParameters, serverUrl, instance)

const user = new UserApi(baseParameters, serverUrl, instance)

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
