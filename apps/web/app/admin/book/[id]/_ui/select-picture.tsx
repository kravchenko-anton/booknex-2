import { useUploadFile } from '@/hooks/useFileUpload'
import { getFileUrl } from 'global/api-config'
import { Controller, type Control } from 'react-hook-form'

interface SelectPictureProperties {
	disable?: boolean
	control: Control<any>
}

export const SelectPicture = ({
	control,
	disable
}: SelectPictureProperties) => {
	const { upload, uploadLoading } = useUploadFile()
	return (
		<Controller
			control={control}
			name={'picture'}
			render={({
				field: { value = '', onChange: setPicture },
				fieldState: { error }
			}) => (
				<>
					<div>
						<div>
							<input
								type='file'
								className='hidden'
								disabled={uploadLoading || disable}
								onChange={async ({ target }) => {
									const file = target.files?.[0]

									if (!file) return
									upload({
										file,
										folder: 'booksCovers'
									}).then(response => {
										setPicture(response.data.name)
									})
								}}
							/>
							<img
								width={220}
								className='border-bordered  cursor-pointer rounded border-[1px]'
								height={300}
								src={getFileUrl(value)}
								alt='Cover'
								onClick={() => {
									const element: HTMLElement | null =
										document.querySelector('input[type=file]')
									element?.click()
								}}
							/>
						</div>
					</div>
					{!!error && (
						<p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>
					)}
				</>
			)}
		/>
	)
}
