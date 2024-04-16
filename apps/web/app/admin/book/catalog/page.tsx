'use client'
import { BookCatalogTable } from '@/app/admin/book/catalog/book-catalog-table'
import api from '@/services/api'
import type { NextPageProps } from '@/types/global'
import {
	validateNumberParameter,
	validateStringParameter
} from '@/utils/validate-parameter'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'

const Page: FC<NextPageProps> = ({ searchParams }) => {
	const searchTerm = validateStringParameter(searchParams?.searchTerm)
	const page = validateNumberParameter(searchParams?.page)
	const { data: books } = useQuery({
		queryKey: ['books', searchTerm, page],
		queryFn: () => api.book.catalog(searchTerm, +page),
		select: data => data.data
	})

	return <BookCatalogTable books={books} page={+page} searchTerm={searchTerm} />
}
export default Page
