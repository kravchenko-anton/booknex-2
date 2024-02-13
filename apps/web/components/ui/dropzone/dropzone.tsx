'use client'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { File } from 'icons'
import { useCallback, useState } from 'react'
import { settings } from './settings'
import type { DropzoneProperties } from './types'

const Dropzone = ({
	onDropFile = () => null,
	defaultFiles = [],
	multiple = false,
	disabled = false,
	className = '',
	style,
	accept = 'image/*',
	variant = 'foreground',
	onChange = () => {},
	onFileDelete = () => {},
	size = 'sm',
	...properties
}: DropzoneProperties) => {
	const [files, setFiles] = useState<File[]>(defaultFiles)
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (!multiple) {
				setFiles(acceptedFiles)
				onDropFile(acceptedFiles)
			}
			setFiles([...files, ...acceptedFiles])
			onDropFile(acceptedFiles)
		},
		[files, multiple, onDropFile]
	)

	return (
		<div className={cn(settings.maxWidth[size], className)} style={style}>
			<div
				className={cn(
					'flex gap-2 overflow-scroll',
					files.length === 0 && 'hidden'
				)}
			>
				{files.map(
					file =>
						file && (
							<div key={file.name + file.type}>
								<button
									color={variant}
									className={cn(
										'mb-2 max-w-[200px] items-center justify-center rounded-xl border-[1px] p-2 text-center',
										settings.colors[variant]
									)}
									onClick={() => {
										setFiles(files.filter(f => f.name !== file.name))
										onFileDelete(file)
									}}
								>
									<File
										color={Color.white}
										width={45}
										height={45}
										className='mx-auto mb-2'
									/>
									<span className='w-full'>{file.name}</span>
								</button>
							</div>
						)
				)}
			</div>
			<div
				className={cn(
					'mt-2 flex cursor-pointer items-center justify-center rounded-xl  border-2  duration-200',
					settings.padding[size],
					settings.colors[variant]
				)}
			>
				<input
					multiple={multiple}
					type='file'
					className='h-full w-full cursor-pointer'
					disabled={disabled}
					accept={accept}
					onChange={event => {
						if (event.target.files) {
							onDrop([...(event.target.files as unknown as File[])])
							onChange(event)
						}
					}}
					{...properties}
				/>
			</div>
		</div>
	)
}

export default Dropzone
