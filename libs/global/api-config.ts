export const serverURL = 'https://booknex-server.up.railway.app/'

export const getFileUrl = (path: string) => {
	if (path?.startsWith('http')) return path
	return `https://f005.backblazeb2.com/file/Booknex/${path}`
}
