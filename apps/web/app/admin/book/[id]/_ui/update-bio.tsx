import { Button, Field, FormTextArea } from '@/components/ui'
import api from '@/services'
import { cn } from '@/utils'
import { getDirtyValues } from '@/utils/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
	UpdateBookBioValidation,
	type UpdateBookBioValidationType
} from 'global/dto/book/update.book.dto'

import { PenNib, Star } from 'icons'
import type { FC } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'

interface UpdateBioProperties {
	id: number
	title: string
	author: string
	readingTime: number
	rating: number
	description: string
	onSuccess: () => void
}

const UpdateBio: FC<UpdateBioProperties> = properties => {
	const { mutateAsync: updateBio, isLoading: updateBioLoading } = useMutation({
		mutationKey: ['update-book-bio'],
		mutationFn: ({
			id,
			payload
		}: {
			id: number
			payload: UpdateBookBioValidationType
		}) => api.book.update(id, payload),
		onSuccess: properties.onSuccess
	})
	const {
		handleSubmit,
		control,
		reset,
		formState: { dirtyFields }
	} = useForm<UpdateBookBioValidationType>({
		mode: 'onSubmit',
		resolver: zodResolver(UpdateBookBioValidation),
		defaultValues: {
			title: properties.title,
			author: properties.author,
			rating: properties.rating,
			description: properties.description
		}
	})

	return (
		<div>
			<div className='mb-4 flex flex-wrap items-center justify-center  gap-2 md:flex-nowrap'>
				<div className='md:w-4/5 '>
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
					isLoading={updateBioLoading}
					variant='primary'
					onClick={handleSubmit(data =>
						updateBio({
							id: properties.id,

							payload: getDirtyValues(dirtyFields, {
								author: data.author,
								title: data.title,
								rating: data.rating,
								description: data.description
							})
						})
					)}
				>
					Save
				</Button>
			</div>
		</div>
	)
}

export default UpdateBio
