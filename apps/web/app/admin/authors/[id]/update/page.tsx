import { useUpdate } from '@/app/admin/authors/[id]/update/useUpdate'
import type { ManipulationAuthorValidationSchemaType } from '@/app/admin/authors/validation'
import { ManipulationAuthorValidationSchema } from '@/app/admin/authors/validation'
import { Button, Field } from '@/components/ui'
import FormDropzone from '@/components/ui/dropzone/form-dropzone'
import { SheetHeader } from '@/components/ui/sheet'
import FormTextEditor from '@/components/ui/text-editor/form-text-editor'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Page = () => {
	const { control, setValue } = useForm<ManipulationAuthorValidationSchemaType>(
		{
			resolver: zodResolver(ManipulationAuthorValidationSchema)
		}
	)

	const parameters = useSearchParams()
	const id = +parameters.get('id')
	const { updateAuthor } = useUpdate(id)
	// const { data } = useQuery(
	// 	['update  author'],
	// 	({
	// 		id,
	// 		name,
	// 		picture,
	// 		description,
	// 		books
	// 	}: {
	// 		id: number
	// 		name: string
	// 		picture: string
	// 		description: string
	// 		books: string
	// 	}) =>
	// 		authorService.update(id, {
	// 			name,
	// 			picture,
	// 			description,
	// 			books
	// 		}),
	// 	{
	// 		onSuccess: () => successToast('Author update'),
	// 		onError: () => errorToast('An error occurred while creating the author')
	// 	}
	// )

	return (
		<div>
			<SheetHeader className='pb-4'>
				<h1 className='text-2xl font-medium'>Create author</h1>
			</SheetHeader>
			<Field
				control={control}
				// defaultValue={defaultValues.name}
				name='name'
				type='text'
				variant='shade'
				placeholder='Name'
			/>
			<h1 className='mb-2 mt-4 text-xl'>Picture</h1>
			<FormDropzone
				control={control}
				name='picture'
				size='sm'
				// defaultFiles={[defaultValues.picture?.blob as File]}
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
				// defaultValue={defaultValues.description}
				variant='shade'
				control={control}
				name='description'
				placeholder='Enter description'
				className='mt-4 h-[150px]'
			/>

			<Button
				size='md'
				className='mt-8'
				// onClick={onSubmit}
				type='submit'
				variant='primary'
			>
				Create
			</Button>
		</div>
	)
}

export default Page
