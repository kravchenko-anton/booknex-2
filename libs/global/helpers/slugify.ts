//slugify string

export const slugify = (string: string) =>
	string
		.toString()
		.toLowerCase()
		.trim()
		.replaceAll(/\s+/g, '-')
		.replaceAll(/[^\w-]+/g, '')
		.replaceAll(/--+/g, '-')
		.replaceAll(/^-+/, '')
		.replaceAll(/-+$/, '')
