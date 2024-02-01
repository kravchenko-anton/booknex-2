import SelectGenres from '@/features/books/shared/select-genres'
import { Button, Field, FormTextArea } from '@/shared/ui'
import { dirtyValues } from '@/shared/utils/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Book, PenNib, User } from 'icons'
import type { FC } from 'react'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

interface UpdateBioProperties {
	title: string
	author: string
	pages: number
	popularity: number
	description: string
	genres: number[]
	onSaveEdit: (data: object) => void
}

const UpdateBioValidationSchema = z.object({
	title: z.string(),
	author: z.string(),
	pages: z.coerce.number(),
	popularity: z.coerce.number(),
	description: z.string(),
	genres: z.array(z.number())
})

export type UpdateBioValidationSchemaType = z.infer<
	typeof UpdateBioValidationSchema
>

const UpdateBio: FC<UpdateBioProperties> = properties => {
	const [isEditing, setIsEditing] = useState(false)
	const {
		handleSubmit,
		control,
		reset,
		formState: { dirtyFields }
	} = useForm<UpdateBioValidationSchemaType>({
		mode: 'onSubmit',
		resolver: zodResolver(UpdateBioValidationSchema)
	})
	return (
		<div>
			<div className='mb-4 flex gap-2'>
				<div className='w-3/4'>
					<h1 className='mb-2 text-xl'>Title</h1>
					<Field
						onClick={() => setIsEditing(true)}
						control={control}
						name='title'
						defaultValue={properties.title}
					/>
				</div>
				<div className='w-4/5'>
					<h1 className='mb-2 text-xl'>Author</h1>
					<Field
						onClick={() => setIsEditing(true)}
						control={control}
						name='author'
						defaultValue={properties.author}
						icon={PenNib}
					/>
				</div>

				<div className='w-4/12'>
					<h1 className='mb-2 text-xl'>Pages</h1>
					<Field
						control={control}
						name='pages'
						onClick={() => setIsEditing(true)}
						type='number'
						defaultValue={properties.pages}
						icon={Book}
					/>
				</div>
				<div className='w-5/12'>
					<h1 className='mb-2 text-xl'>Popularity</h1>

					<Field
						onClick={() => setIsEditing(true)}
						control={control}
						name='popularity'
						type='number'
						defaultValue={properties.popularity}
						icon={User}
					/>
				</div>
				<button className='w-5/6 text-left' onClick={() => setIsEditing(true)}>
					<h1 className='mb-2 text-xl'>Genres</h1>
					<SelectGenres control={control} defaultValue={properties.genres} />
				</button>
			</div>
			<div className='w-full'>
				<h1 className='mb-2 text-xl'>Description</h1>
				<FormTextArea
					control={control}
					name='description'
					onClick={() => setIsEditing(true)}
					className='text-md'
					defaultValue={properties.description}
					style={{
						height: 250
					}}
				/>
			</div>

			<div className={twMerge('', isEditing ? 'mt-4 flex gap-2' : 'hidden')}>
				<Button
					size='sm'
					variant='foreground'
					onClick={() => {
						setIsEditing(false)
						reset()
					}}
				>
					Discard
				</Button>
				<Button
					size='sm'
					variant='primary'
					// post ony dirty values
					onClick={handleSubmit(data => {
						if (!data) return
						properties.onSaveEdit(dirtyValues(dirtyFields, data))
						setIsEditing(false)
					})}
				>
					Save
				</Button>
			</div>
		</div>
	)
}

export default UpdateBio
