import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from '../../../../../mobile/src/hooks/useDebounce'
import { authorService } from '../../../../services/author/author-service'
import { genreService } from '../../../../services/genre/genre-service'
import { parserService } from '../../../../services/parser/parser-services'
import { errorToast, successToast } from '../../../../utils/toast'

export const useCreate = () => {
	const { mutateAsync: unfold } = useMutation(
		['upload ebook'],
		(formData: FormData) => parserService.unfold(formData),
		{
			onSuccess: () => {
				successToast('File uploaded')
			},
			onError: () => {
				errorToast('Error while uploading book')
			}
		}
	)
	const { control, handleSubmit, setValue } = useForm<{
		title: string
		picture: Blob
		pages: number
		genres: string[]
		author: number
		popularity: number
		color: string
		likedPercentage: number
		description: string
	}>()

	const [authorSearch, setAuthorSearch] = useState('')
	const seachAuthor = useDebounce(authorSearch, 500)
	const { data: genre } = useQuery(['genres'], () => genreService.all())
	const { data: authors } = useQuery(['authors'], () =>
		authorService.all(seachAuthor)
	)
	return {
		unfold,
		control,
		handleSubmit,
		setValue,
		setAuthorSearch,
		genre,
		authors
	}
}
