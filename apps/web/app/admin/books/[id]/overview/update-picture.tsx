import Image from 'next/image'
import type { FC } from 'react'
import * as React from 'react'

interface UpdatePictureProperties {
	updatePicture: (file: File) => void
	picture: string
}

const UpdatePicture: FC<UpdatePictureProperties> = ({
	picture,
	updatePicture
}) => {
	return (
		<div>
			<input
				type='file'
				className='hidden'
				onChange={event => {
					const file = event.target.files[0]
					if (file) {
						updatePicture(file)
					}
				}}
			/>
			<Image
				width={220}
				className='border-muted rounded-xl border-2'
				height={300}
				onClick={() => {
					const element: HTMLElement =
						document.querySelector('input[type=file]')
					element?.click()
				}}
				src={picture}
				alt='Cover'
				objectFit='cover'
			/>
		</div>
	)
}

export default UpdatePicture
