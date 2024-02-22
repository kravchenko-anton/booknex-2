import instance from '@/services/interceptors'
import {
	AdminApi,
	AuthApi,
	BookApi,
	CatalogApi,
	GenreApi,
	ParserApi,
	StorageApi,
	UserApi
} from 'global/api-client'
import { serverURL } from 'global/api-config'

export default {
	auth: new AuthApi(undefined, serverURL, instance),
	admin: new AdminApi(undefined, serverURL, instance),
	book: new BookApi(undefined, serverURL, instance),
	genre: new GenreApi(undefined, serverURL, instance),
	parser: new ParserApi(undefined, serverURL, instance),
	catalog: new CatalogApi(undefined, serverURL, instance),
	storage: new StorageApi(undefined, serverURL, instance),
	user: new UserApi(undefined, serverURL, instance)
}
