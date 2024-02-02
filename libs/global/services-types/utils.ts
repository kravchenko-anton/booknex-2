export interface GetAllTypeOutput<T> {
	data: T
	totalPages: number
	canLoadMore: boolean
}
