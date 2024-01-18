'use client'
import { bookService } from '@/services/book/book-service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const Page = () => {
	const parameters = useParams()
	const { data: book } = useQuery(['book overview'], () =>
		bookService.infoById(+parameters.id)
	)
	console.log(book)
	return <div>Page</div>
}

export default Page
