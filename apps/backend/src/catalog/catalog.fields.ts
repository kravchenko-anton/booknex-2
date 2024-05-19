/* eslint-disable unicorn/prefer-spread */
export const catalogSearchFields = (query: string) =>
	({
		isPublic: true,
		OR: Array.from([
			{
				title: {
					mode: 'insensitive' as const,
					contains: query
				}
			} as const,
			{
				author: {
					contains: query,
					mode: 'insensitive' as const
				}
			} as const
		])
	}) as const
