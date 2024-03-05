import {
	UpdateBookDto,
	type UpdateBookDtoType
} from '@/app/admin/book/_shared/validation/update.book.dto'
import { Button, Field, FormTextArea } from '@/components/ui'
import { cn } from '@/utils'
import { dirtyValues } from '@/utils/form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Book, PenNib, User } from 'icons'
import type { FC } from 'react'
import * as React from 'react'
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
	} = useForm<UpdateBookDtoType>({
		mode: 'onSubmit',
		resolver: zodResolver(UpdateBookDto)
	})

	return (
		<div>
			<div className='mb-4 flex flex-wrap gap-2 md:flex-nowrap'>
				<div className='md:w-4/5'>
					<h1 className='mb-2 text-xl'>Title</h1>
					<Field
						control={control}
						name='title'
						defaultValue={properties.title}
					/>
				</div>
				<div className='md:w-4/5'>
					<h1 className='mb-2 text-xl'>Author</h1>
					<Field
						control={control}
						name='author'
						defaultValue={properties.author}
						icon={PenNib}
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
				/>
			</div>

			<div
				className={cn(
					'',
					Object.keys(dirtyFields).length > 0 ? 'mt-4 flex gap-2' : 'hidden'
				)}
			>
				<Button
					size='sm'
					variant='foreground'
					onClick={() => {
						reset()
					}}
				>
					Discard
				</Button>
				<Button
					size='sm'
					variant='primary'
					onClick={handleSubmit(data =>
						properties.onSaveEdit(dirtyValues(dirtyFields, data))
					)}
				>
					Save
				</Button>
			</div>
		</div>
	)
}

export default UpdateBio
