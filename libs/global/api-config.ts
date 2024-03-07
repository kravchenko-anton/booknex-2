export const serverURL = 'http://localhost:7777'
export const emulatorServerURL = 'http://10.0.2.2:7777'

export const getFileUrl = (path: string) => {
	if (path?.startsWith('http')) return path
	return `${serverURL}/uploads/${path}`
}
