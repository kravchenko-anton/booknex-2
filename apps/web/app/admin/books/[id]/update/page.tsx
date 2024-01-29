'use client'
import type { UpdateBookValidationSchemaType } from '@/features/books/update/validation'
import { updateBookValidationSchema } from '@/features/books/update/validation'
import { bookService } from '@/shared/services/book/book-service'
import { genreService } from '@/shared/services/genre/genre-service'
import { useUploadFile } from '@/shared/utils/files'
import { errorToast, successToast } from '@/shared/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { BookPayload } from 'global/services-types/book-types'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
//TODO: полностью переделать по нормальному

const Page = () => {
	const parameters = useParams()
	const { data: book } = useQuery({
		queryKey: ['book'],
		queryFn: () => bookService.infoById(+parameters.id)
	})
	const router = useRouter()
	const { data: genres } = useQuery({
		queryKey: ['genres'],
		queryFn: () => genreService.all()
	})

	const { upload } = useUploadFile()
	const { mutateAsync: update } = useMutation({
		mutationKey: ['update book'],
		mutationFn: (payload: Partial<BookPayload>) =>
			bookService.update(+parameters.id, payload),
		onSuccess: () => {
			successToast('Book updated')
			router.push('/admin/books')
		},
		onError: () => errorToast('Error while uploading book')
	})

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<UpdateBookValidationSchemaType>({
		resolver: zodResolver(updateBookValidationSchema)
	})
	if (!book || !genres) return null
	return (
		<div>
			<h1 className='mb-4 text-center text-3xl font-medium'>Update book</h1>

			{
				// TODO:  Сделать так-же как при создании и только в preview делать композицию книги
			}
		</div>
	)
}
export default Page
