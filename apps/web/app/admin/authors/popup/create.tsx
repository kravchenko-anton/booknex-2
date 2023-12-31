'use client'
import { Button, Field } from '@/ui/components'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import FormDropzone from '../../../../../../libs/ui/react/dropzone/form-dropzone'
import FormTextEditor from '../../../../../../libs/ui/react/text-editor/form-text-editor'
import { useCreate } from './useCreate'
import type { CreateAuthorValidationSchemaType } from './validation'
import { createAuthorValidationSchema } from './validation'

interface CreateAuthorPopupProperties {
	onCreate: ({ id, name }: { name: string; id: number }) => void
	defaultValues?: CreateAuthorValidationSchemaType
}

const CreateAuthorPopup: FC<CreateAuthorPopupProperties> = ({
	defaultValues = {},
	onCreate = () => {}
}) => {
	const { control, handleSubmit, setValue } =
		useForm<CreateAuthorValidationSchemaType>({
			resolver: zodResolver(createAuthorValidationSchema)
		})
	const { createAuthor } = useCreate()

	const onSubmit = () => {
		if (defaultValues.picture) {
			setValue('picture', defaultValues.picture)
		}
		handleSubmit(data => {
			createAuthor(data).then(({ id, name }) => {
				onCreate({ id, name })
			})
		})()
	}
	return (
		<div className='p-4'>
			<h1 className='mb-4 text-center text-3xl font-medium'>Create author</h1>
			<Field
				control={control}
				defaultValue={defaultValues.name}
				name='name'
				type='text'
				variant='shade'
				placeholder='Name'
			/>
			<h1 className='mb-2 mt-4 text-xl'>Picture</h1>
			<FormDropzone
				control={control}
				name='picture'
				size='lg'
				defaultFiles={[defaultValues.picture?.blob as File]}
				variant='vibrant'
				multiple={false}
				accept={'image/*'}
				onDropFile={acceptedFiles => {
					setValue('picture', {
						name: acceptedFiles[0].name,
						blob: new Blob([acceptedFiles[0]])
					})
				}}
			/>
			<FormTextEditor
				defaultValue={defaultValues.description}
				variant='shade'
				control={control}
				name='description'
				placeholder='Enter description'
				className='mt-4 h-[150px]'
			/>

			<Button
				size='md'
				className='mt-8'
				onClick={onSubmit}
				type='submit'
				variant='primary'
			>
				Create
			</Button>
		</div>
	)
}

export default CreateAuthorPopup
