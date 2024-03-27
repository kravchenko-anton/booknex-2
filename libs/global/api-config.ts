export const serverURL = 'http://localhost:7777'
export const emulatorServerURL = 'http://10.0.2.2:7777'

export const getFileUrl = (path: string) => {
	if (path?.startsWith('http')) return path
	return `https://f005.backblazeb2.com/file/Booknex/${path}`
}
