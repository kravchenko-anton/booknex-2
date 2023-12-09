'use client'
import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../../components/button/button'
import Dropzone from '../../../components/dropzone/dropzone'
import Field from '../../../components/field/field'
import FormTextEditor from '../../../components/text-editor/form-text-editor'
import { useCreateAuthor } from './useCreateAuthor'

interface CreateAuthorPopupProperties {
	onCreate: ({
		name,
		description
	}: {
		name: string
		description: string
	}) => void
}
const Page: FC<CreateAuthorPopupProperties> = ({ onCreate }) => {
	const { control, handleSubmit, setValue } = useForm<{
		name: string
		picture: {
			name: string
			blob: Blob
		}
		description: string
	}>()
	const { createAuthor } = useCreateAuthor()
	return (
		<form
			onSubmit={handleSubmit(data => {
				createAuthor(data)
				onCreate(data)
			})}
			className='p-4'>
			<h1 className='mb-4 text-center text-3xl font-medium'>Create author</h1>
			<Field control={control} name='name' color='shade' placeholder='Name' />
			<h1 className='mb-2 mt-4 text-xl'>Picture</h1>
			<Dropzone
				size='lg'
				color='vibrant'
				options={{
					multiple: false,
					accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
				}}
				onDropFile={acceptedFiles => {
					setValue('picture', {
						name: acceptedFiles[0].name,
						blob: new Blob([acceptedFiles[0]])
					})
				}}
			/>
			<Controller
				control={control}
				name={'description'}
				render={({ field: { value, onChange, onBlur } }) => (
					<FormTextEditor
						color='shade'
						value={value}
						onBlur={onBlur}
						onChange={onChange}
						placeholder='Enter description'
						className='mt-4 h-[150px]'
					/>
				)}
			/>

			<Button className='mt-8' type='submit' color='primary'>
				Create
			</Button>
		</form>
	)
}

export default Page
