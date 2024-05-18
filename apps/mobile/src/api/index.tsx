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

const mobileInstance: any = instance
const serverUrl = Config.SERVER_URL
const baseParameters = {
	basePath: serverUrl,
	isJsonMime: () => true
}
const auth = new AuthApi(baseParameters, serverUrl, undefined)

const book = new BookApi(baseParameters, serverUrl, mobileInstance)

const catalog = new CatalogApi(baseParameters, serverUrl, mobileInstance)

const ebook = new EbookApi(baseParameters, serverUrl, mobileInstance)

const genre = new GenreApi(baseParameters, serverUrl, mobileInstance)

const parser = new ParserApi(baseParameters, serverUrl, mobileInstance)

const recommendation = new RecommendationApi(
	baseParameters,
	serverUrl,
	mobileInstance
)

const review = new ReviewApi(baseParameters, serverUrl, mobileInstance)

const storage = new StorageApi(baseParameters, serverUrl, mobileInstance)

const user = new UserApi(baseParameters, serverUrl, mobileInstance)

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
