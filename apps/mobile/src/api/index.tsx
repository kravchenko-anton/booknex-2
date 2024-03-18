import instance from '@/api/interceptors'
import {
	AuthApi,
	BookApi,
	CatalogApi,
	GenreApi,
	ParserApi,
	RecommendationApi,
	StorageApi,
	UserApi
} from 'global/api-client'
import { ReviewApi } from 'global/api-client/clients/review-api'
import { emulatorServerURL } from 'global/api-config'
import 'react-native-url-polyfill/auto'

export default {
	auth: new AuthApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		undefined
	),
	book: new BookApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	genre: new GenreApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	parser: new ParserApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	catalog: new CatalogApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	storage: new StorageApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	user: new UserApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	review: new ReviewApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	),
	recommendation: new RecommendationApi(
		{
			basePath: emulatorServerURL,
			isJsonMime: () => false
		},
		undefined,
		instance
	)
}
