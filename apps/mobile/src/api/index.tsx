import instance from '@/api/interceptors'
import {
	AuthApi,
	BookApi,
	CatalogApi,
	GenreApi,
	ParserApi,
	RecommendationApi,
	ReviewApi,
	StorageApi,
	UserApi
} from 'global/api-client'

export default {
	auth: new AuthApi(undefined, undefined, instance),
	book: new BookApi(undefined, undefined, instance),
	genre: new GenreApi(undefined, undefined, instance),
	parser: new ParserApi(undefined, undefined, instance),
	catalog: new CatalogApi(undefined, undefined, instance),
	storage: new StorageApi(undefined, undefined, instance),
	user: new UserApi(undefined, undefined, instance),
	review: new ReviewApi(undefined, undefined, instance),
	recommendation: new RecommendationApi(undefined, undefined, instance)
}
