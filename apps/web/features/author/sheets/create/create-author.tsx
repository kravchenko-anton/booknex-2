'use client'
import { useCreate } from '@/features/author/sheets/create/useCreate'
import type { ManipulationAuthorValidationSchemaType } from '@/features/author/validation'
import { ManipulationAuthorValidationSchema } from '@/features/author/validation'
import { Button, Field } from '@/shared/ui'
import FormDropzone from '@/shared/ui/dropzone/form-dropzone'
import { SheetHeader } from '@/shared/ui/sheet'
import FormTextEditor from '@/shared/ui/text-editor/form-text-editor'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface CreateAuthorProperties {
	onCreate: ({ id, name }: { name: string; id: number }) => void
	defaultValues?: ManipulationAuthorValidationSchemaType
}

const CreateAuthor: FC<CreateAuthorProperties> = ({
	defaultValues = {},
	onCreate = () => {}
}) => {
	const { control, handleSubmit, setValue } =
		useForm<ManipulationAuthorValidationSchemaType>({
			resolver: zodResolver(ManipulationAuthorValidationSchema)
		})
	const { createAuthor } = useCreate()

	const onSubmit = () => {
		if (defaultValues.picture) {
			setValue('picture', defaultValues.picture)
		}
		handleSubmit(data => {
			createAuthor({
				description: data.description,
				name: data.name,
				picture: {
					blob: data.picture?.blob,
					name: data.picture?.name
				}
			}).then(({ id, name }) => {
				onCreate({ id, name })
			})
		})()
	}
	return (
		<div>
			<SheetHeader className='pb-4'>
				<h1 className='text-2xl font-medium'>Create author</h1>
			</SheetHeader>
			<Field
				control={control}
				defaultValue={defaultValues.name}
				name='name'
				type='text'
				variant='muted'
				placeholder='Name'
			/>
			<h1 className='mb-2 mt-4 text-xl'>Picture</h1>
			<FormDropzone
				control={control}
				name='picture'
				size='sm'
				defaultFiles={[defaultValues.picture?.blob as File]}
				variant='muted'
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
				variant='muted'
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

export default CreateAuthor
