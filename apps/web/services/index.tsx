import instance from '@/services/interceptors'
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
import { serverURL } from 'global/api-config'

export default {
	auth: new AuthApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	book: new BookApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	genre: new GenreApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	parser: new ParserApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	catalog: new CatalogApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	storage: new StorageApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	user: new UserApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	review: new ReviewApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	recommendation: new RecommendationApi(
		{
			basePath: serverURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	)
}
