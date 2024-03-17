import api from '@/services'
import { useMutation } from '@tanstack/react-query'
import { getFileUrl } from 'global/api-config'
import Image from 'next/image'
import type { FC } from 'react'
import * as React from 'react'

interface UpdatePictureProperties {
	picture: string
	id: number
	onSuccess?: () => void
}

const BookUpdatePicture: FC<UpdatePictureProperties> = properties => {
	const {
		mutateAsync: updatePictureMutation,
		isLoading: updatePictureLoading
	} = useMutation({
		mutationKey: ['update-book'],
		mutationFn: ({ id, payload }: { id: number; payload: File }) =>
			api.book.updatePicture(id, payload),
		onSuccess: properties.onSuccess
	})
	return (
		<div>
			<input
				type='file'
				className='hidden'
				disabled={updatePictureLoading}
				onChange={async ({ target }) => {
					const file = target?.files?.[0]
					if (!file) return
					await updatePictureMutation({
						id: properties.id,
						payload: file
					})
				}}
			/>
			<Image
				width={220}
				className='border-muted cursor-pointer rounded-lg border-2'
				height={300}
				src={getFileUrl(properties.picture)}
				alt='Cover'
				onClick={() => {
					const element: HTMLElement | null =
						document.querySelector('input[type=file]')
					element?.click()
				}}
			/>
		</div>
	)
}

export default BookUpdatePicture
