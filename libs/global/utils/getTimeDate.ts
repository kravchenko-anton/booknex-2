export const getTimeDate = (initialDate?: Date | string) => {
	if (initialDate) {
		return new Date(initialDate)
	}
	return new Date()
}
