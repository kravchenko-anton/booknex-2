export const groupActivity = (data: { id: number; createdAt: Date }[] = []) => {
	return data.reduce((accumulator, current) => {
		const date = current.createdAt.toISOString().split('T')[0]
		const index = accumulator.findIndex(item => item.date === date)
		if (index === -1) {
			accumulator.push({
				date,
				count: 1
			})
		} else {
			accumulator[index].count++
		}
		return accumulator
	}, [])
}
