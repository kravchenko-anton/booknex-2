import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
	const validationSchema = z.object({
		title: z
			.string()
			.refine(value => value && value.length > 0, 'Title is required'),
		picture: z.custom<File>(v => v instanceof File),
		pages: z.number().refine(value => value > 0, {
			message: 'At least one page is required'
		}),
		likedPercentage: z.number().refine(value => value > 0, {
			message: 'At least one like is required'
		}),
		description: z.string().refine(value => value && value.length > 0, {
			message: 'Description is required'
		}),
		popularity: z.number().refine(value => value > 0, {
			message: 'At least one view is required'
		}),
		author: z.object({
			label: z.string(),
			value: z.number()
		}),
		books: z.array(
			z
				.object({
					name: z.string().refine(value => !value.includes('.epub'), {
						message: 'File must be a .epub file'
					}),
					content: z.array(
						z.object({
							title: z.string(),
							content: z.string()
						})
					)
				})
				.refine(value => value.name.length > 0, {
					message: 'File is required'
				})
		),
		genres: z.array(z.string()).refine(value => value.length > 2, {
			message: 'At least two genre is required'
		})
	})
	type ValidationSchemaType = z.infer<typeof validationSchema>
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<ValidationSchemaType>({
		resolver: zodResolver(validationSchema)
	})

	const { data: genre } = useQuery(['genres'], () => genreService.all())

	return {
		unfold,
		control,
		errors,
		handleSubmit,
		setValue,
		genre
	}
}
