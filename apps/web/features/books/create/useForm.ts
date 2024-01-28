import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { CreateBookValidationSchemaType } from './validation'
import { createBookValidationSchema } from './validation'

export const useCreateForm = () => {
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<CreateBookValidationSchemaType>({
		resolver: zodResolver(createBookValidationSchema)
	})
	return {
		control,
		watch,
		handleSubmit,
		errors,
		setValue
	}
}
