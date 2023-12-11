export function optimizeFilename(filename: string) {
	// Split the filename and extension
	const [name, extension] = filename.split(/\.(?=[^.]+$)/)

	// Remove extra dots, spaces, and dashes while keeping alphanumeric characters and convert spaces to dashes
	const optimizedName = name
		.replaceAll(/[^\s\w-]/g, '')
		.trim()
		.replaceAll(/\s+/g, '-')
		.replaceAll(/-+/g, '-')

	// Combine the optimized filename and the original extension
	return `${optimizedName}.${extension}`
}
