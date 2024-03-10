import {
	UpdateBookDto,
	type UpdateBookDtoType
} from '@/app/admin/book/_shared/validation/update.book.dto'
import { Button, Field, FormTextArea } from '@/components/ui'
import { cn } from '@/utils'
import { dirtyValues } from '@/utils/form'
import { zodResolver } from '@hookform/resolvers/zod'

import { PenNib, Star } from 'icons'
import type { FC } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'

interface UpdateBioProperties {
	title: string
	author: string
	readingTime: number
	rating: number
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
		resolver: zodResolver(UpdateBookDto),
		defaultValues: {
			title: properties.title,
			author: properties.author,
			rating: properties.rating,
			description: properties.description
		}
	})

	return (
		<div>
			<div className='mb-4 flex flex-wrap gap-2 md:flex-nowrap'>
				<div className='md:w-4/5'>
					<h1 className='mb-2 text-xl'>Title</h1>
					<Field control={control} name='title' />
				</div>
				<div className='md:w-3/4'>
					<h1 className='mb-2 text-xl'>Author</h1>
					<Field control={control} name='author' icon={PenNib} />
				</div>

				<div className='md:w-5/12'>
					<h1 className='mb-2 text-xl'>Rating</h1>

					<Field
						control={control}
						name='rating'
						type='number'
						max={5}
						min={1}
						icon={Star}
					/>
				</div>
			</div>

			<div className='w-full'>
				<h1 className='mb-2 text-xl'>Description</h1>
				<FormTextArea
					control={control}
					name='description'
					className='text-md'
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
