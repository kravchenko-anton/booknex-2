import { getFileUrl } from 'global/api-config'
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
}) => (
	<div>
		<input
			type='file'
			className='hidden'
			onChange={({ target }) => {
				const file = target?.files?.[0]
				if (!file) return
				updatePicture(file)
			}}
		/>
		<Image
			width={220}
			className='border-muted cursor-pointer rounded-xl border-2'
			height={300}
			src={getFileUrl(picture)}
			alt='Cover'
			objectFit='cover'
			onClick={() => {
				const element: HTMLElement | null =
					document.querySelector('input[type=file]')
				element?.click()
			}}
		/>
	</div>
)

export default UpdatePicture
