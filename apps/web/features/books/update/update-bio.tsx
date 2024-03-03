import { Button, Field, FormTextArea } from '@/components/ui'
import { cn } from '@/utils'
import { dirtyValues } from '@/utils/form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { EditBookDto } from 'backend/src/book/dto/manipulation.book.dto'
import { Book, PenNib, User } from 'icons'
import type { FC } from 'react'
import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface UpdateBioProperties {
	title: string
	author: string
	pages: number
	popularity: number
	description: string
	onSaveEdit: (data: object) => void
}

const UpdateBio: FC<UpdateBioProperties> = properties => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { dirtyFields }
	} = useForm<EditBookDto>({
		mode: 'onSubmit',
		resolver: classValidatorResolver(EditBookDto)
	})
	//set isEditing if something change
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div>
			<div className='mb-4 flex flex-wrap gap-2 md:flex-nowrap'>
				<div className='md:w-4/5'>
					<h1 className='mb-2 text-xl'>Title</h1>
					<Field
						control={control}
						name='title'
						defaultValue={properties.title}
						onClick={() => setIsEditing(true)}
					/>
				</div>
				<div className='md:w-4/5'>
					<h1 className='mb-2 text-xl'>Author</h1>
					<Field
						control={control}
						name='author'
						defaultValue={properties.author}
						icon={PenNib}
						onClick={() => setIsEditing(true)}
					/>
				</div>

				<div className='md:w-4/12'>
					<h1 className='mb-2 text-xl'>Pages</h1>
					<Field
						control={control}
						name='pages'
						type='number'
						defaultValue={properties.pages}
						icon={Book}
						onClick={() => setIsEditing(true)}
					/>
				</div>
				<div className='md:w-5/12'>
					<h1 className='mb-2 text-xl'>Popularity</h1>

					<Field
						control={control}
						name='popularity'
						type='number'
						defaultValue={properties.popularity}
						icon={User}
						onClick={() => setIsEditing(true)}
					/>
				</div>
			</div>

			<div className='w-full'>
				<h1 className='mb-2 text-xl'>Description</h1>
				<FormTextArea
					control={control}
					name='description'
					className='text-md'
					defaultValue={properties.description}
					style={{
						height: 250
					}}
					onClick={() => setIsEditing(true)}
				/>
			</div>

			<div className={cn('', isEditing ? 'mt-4 flex gap-2' : 'hidden')}>
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
