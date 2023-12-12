import type { HTMLAttributes } from 'react'
import { useCallback, useState } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import { Edit, File } from '../../../../libs/global/icons/react'
import { Color } from '../../../../libs/ui/colors'

export interface DropzoneProperties extends HTMLAttributes<HTMLDivElement> {
	options?: DropzoneOptions
	size?: 'sm' | 'md' | 'lg'
	color?: keyof Pick<
		typeof Color,
		'gray' | 'foreground' | 'vibrant' | 'shade' | 'background'
	>
	onFileDelete?: (file: File) => void
	onDropFile: (files: File[]) => void
	defaultFiles?: File[]
}

const colorPallete = {
	gray: 'border-gray',
	foreground: 'border-foreground',
	vibrant: 'border-vibrant',
	shade: 'border-shade',
	background: 'border-background'
}

const sizeSettings = {
	sm: 'p-4',
	md: 'p-8',
	lg: 'p-12'
}

const maxWidhtSettings = {
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg'
}

const Dropzone = ({
	onDropFile = () => {},
	className = '',
	defaultFiles = [],
	options = {},
	color = 'foreground',
	onFileDelete = () => {},
	style,
	size = 'sm',
	...properties
}: DropzoneProperties) => {
	const [files, setFiles] = useState<File[]>(defaultFiles)
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setFiles([...files, ...acceptedFiles])
			console.log([...files, ...acceptedFiles], 'files')
			onDropFile(acceptedFiles)
		},
		[files, onDropFile]
	)
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		...options
	})
	return (
		<div className={`${maxWidhtSettings[size]} ${className}`} style={style}>
			<div
				className={`flex gap-2 overflow-scroll ${
					files.length === 0 && 'hidden'
				}`}
			>
				{files.length > 0 &&
					files.map(file => (
						<div key={file.name + file.type} className='items-center'>
							{options.accept &&
							Object.values(options?.accept).includes(['image']) ? (
								<img
									onClick={() => {
										setFiles(files.filter(f => f.name !== file.name))
										onFileDelete(file)
									}}
									className='h-20 w-20 rounded-md bg-transparent'
									src={URL.createObjectURL(file)}
									alt={file.name}
								/>
							) : (
								<div
									onClick={() => {
										setFiles(files.filter(f => f.name !== file.name))
										onFileDelete(file)
									}}
									className={`mb-2 items-center justify-center border-2 text-center ${colorPallete[color]}`}
								>
									<File
										color={Color.white}
										className='mx-auto mb-1'
										width={45}
										height={45}
									/>
									<span
										className='text-gray text-xs'
										style={{ maxWidth: '100px' }}
									>
										{file.name}
									</span>
								</div>
							)}
						</div>
					))}
			</div>
			<div
				{...getRootProps()}
				className={`mt-2 flex cursor-pointer items-center  justify-center  rounded-md border-2  ${sizeSettings[size]} ${colorPallete[color]}`}
				{...properties}
			>
				<input {...getInputProps()} />
				<p className='flex items-center gap-2'>
					<Edit color={Color.white} width={20} height={20} /> Select or drag and
					drop a picture here
				</p>
			</div>
		</div>
	)
}

export default Dropzone
