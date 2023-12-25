import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { CreateBookValidationSchemaType } from './validation'
import { createBookValidationSchema } from './validation'

export const useCreateForm = () => {
	const searchParameters = useSearchParams()
	const defaultValues =
		searchParameters.get('defaultValues') &&
		JSON.parse(searchParameters.get('defaultValues') ?? '')
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<CreateBookValidationSchemaType>({
		resolver: zodResolver(createBookValidationSchema),
		defaultValues: defaultValues && {
			title: defaultValues.title ?? '',
			pages: defaultValues.pages ?? '0',
			popularity: defaultValues.popularity ?? '0',
			description: defaultValues.description ?? '',
			author: {
				label: defaultValues.author.name ?? '',
				value: Number(defaultValues.author.id ?? 0)
			},
			genres:
				defaultValues.genres.map((genre: { id: string; name: string }) => {
					return {
						label: genre.name,
						value: Number(genre.id)
					}
				}) ?? []
		}
	})
	console.log(errors)
	return {
		control,
		watch,
		handleSubmit,
		errors,
		setValue
	}
}
