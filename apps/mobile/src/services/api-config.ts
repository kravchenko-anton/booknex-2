export const SERVER_URL = 'http://10.0.2.2:7777' + '/api'
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/user${string}`
export const getGenresUrl = (string: string) => `/genre${string}`
export const getCatalogUrl = (string: string) => `/catalog${string}`
export const getStorageUrl = (string: string) => `/storage${string}`
export const getAdminUrl = (string: string) => `/admin${string}`

export const getBookUrl = (string: string) => `/book${string}`
export const getAuthorUrl = (string: string) => `/author${string}`
export const getShelfUrl = (string: string) => `/shelf${string}`

export const getHistoryUrl = (string: string) => `/history${string}`
export const getFileUrl = (path: string) => {
	if (path.startsWith('http')) return path
	return `${'https://f005.backblazeb2.com/file/Booknex'}/${path}`
}
