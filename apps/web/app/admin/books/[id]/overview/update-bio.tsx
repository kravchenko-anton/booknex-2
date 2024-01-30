import SelectGenres from '@/features/books/create/select-genres'
import { Button, Field, FormTextArea } from '@/shared/ui'
import { Book, PenNib, User } from 'icons'
import type { FC } from 'react'
import * as React from 'react'
import { useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function dirtyValues(
	dirtyFields: object | boolean,
	allValues: object
): object {
	if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
	// Here, we have an object
	return Object.fromEntries(
		Object.keys(dirtyFields).map(key => [
			key,
			dirtyValues(dirtyFields[key], allValues[key])
		])
	)
}
interface UpdateBioFormProperties {
	title: string
	author: string
	pages: number
	popularity: number
	description: string
	genres: number[]
}

interface UpdateBioProperties extends UpdateBioFormProperties {
	onSaveEdit: (data: object) => void
}

const UpdateBio: FC<UpdateBioProperties> = properties => {
	const [isEditing, setIsEditing] = useState(false)
	const { handleSubmit, control, reset } = useForm<UpdateBioFormProperties>({
		mode: 'onSubmit'
	})

	const { dirtyFields } = useFormState({ control })
	console.log(dirtyFields)
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
						onClick={() => setIsEditing(true)}
						control={control}
						name='pages'
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
