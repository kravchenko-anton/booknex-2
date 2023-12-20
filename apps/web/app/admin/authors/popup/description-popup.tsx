import type { FC } from 'react'

interface AuthorDescriptionPopupProperties {
	text: string
}

const AuthorDescriptionPopup: FC<AuthorDescriptionPopupProperties> = ({
	text
}) => {
	return (
		<div className=' items-center justify-center p-4'>
			<p className='text-lg font-medium text-white'>Description</p>
			<p className='text-gray'>{text}</p>
		</div>
	)
}

export default AuthorDescriptionPopup
