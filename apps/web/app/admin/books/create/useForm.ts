import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { CreateBookValidationSchemaType } from './validation'
import { createBookValidationSchema } from './validation'

export interface DeafultCreateBookValuesType {
	title: string
	pages: number
	popularity: number
	description: string
	author: {
		id: number
		name: string
	}
	genres: {
		id: number
		name: string
	}[]
}

export const useCreateForm = () => {
	const searchParameters = useSearchParams()
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<CreateBookValidationSchemaType>({
		resolver: zodResolver(createBookValidationSchema)
	})
	useEffect(() => {
		if (searchParameters.get('defaultValues')) {
			const defaultValues = JSON.parse(
				searchParameters.get('defaultValues') ?? ''
			) as DeafultCreateBookValuesType
			setValue('title', defaultValues.title ?? '')
			setValue('pages', defaultValues.pages.toString() ?? '0')
			setValue('popularity', Number(defaultValues.popularity ?? 0))
			setValue('description', defaultValues.description ?? '')
			setValue('author', {
				label: defaultValues.author.name ?? '',
				value: Number(defaultValues.author.id ?? 0)
			})
			setValue(
				'genres',
				defaultValues.genres.map(genre => {
					return {
						label: genre.name,
						value: Number(genre.id)
					}
				}) ?? []
			)
		}
	}, [])

	return {
		control,
		handleSubmit,
		errors,
		setValue
	}
}
