// This function is used to get the dirty values of a form
export function dirtyValues(
	dirtyFields: object | boolean,
	allValues: object
): object {
	if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
	// Here, we have an object
	return Object.fromEntries(
		Object.keys(dirtyFields).map(key => [
			key,
			// @ts-ignore - we know that dirtyFields[key] is an object
			dirtyValues(dirtyFields[key], allValues[key])
		])
	)
}
