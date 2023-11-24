export const simplifyString = (string: string) =>
	string
		.replaceAll(/[\W_]+/g, ' ')
		.trim()
		.toLowerCase()
		.replaceAll(/[^\d a-z-]/g, '')
		.replaceAll(/\s+/g, '-')
		.replaceAll(/-+/g, '-')
