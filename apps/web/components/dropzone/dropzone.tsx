import type { HTMLAttributes } from 'react'
import { useCallback, useState } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import { File, Pen } from '../../../../libs/global/icons/react'
import { Color } from '../../../../libs/ui/colors'

interface DropzoneProperties extends HTMLAttributes<HTMLDivElement> {
	options?: DropzoneOptions
	onFileDelete?: (file: File) => void
	onDropFile: (files: File[] | File) => void
}

const Dropzone = ({
	onDropFile,
	className,
	options,
	onFileDelete,
	style,
	...properties
}: DropzoneProperties) => {
	const [files, setFiles] = useState<File[]>([])
	const onDrop = useCallback(acceptedFiles => {
		setFiles(acceptedFiles)
		onDropFile(acceptedFiles)
	}, [])
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		...options
	})
	return (
		<div className={className} style={style}>
			<div className='flex gap-2 overflow-y-scroll'>
				{files.length > 0 &&
					files.map(file => (
						<div key={file.name} className=' items-center '>
							{Object.values(options?.accept).includes(['image']) ? (
								<img
									onClick={() => {
										setFiles(files.filter(f => f.name !== file.name))
										onFileDelete(file)
									}}
									className='h-20 w-20 rounded-md bg-transparent'
									src={URL.createObjectURL(file)}
								/>
							) : (
								<div
									onClick={() => {
										setFiles(files.filter(f => f.name !== file.name))
										onFileDelete(file)
									}}
									className='border-foreground mb-2 items-center justify-center border-2 p-2 text-center'>
									<File
										color={Color.white}
										className='mx-auto mb-1'
										width={45}
										height={45}
									/>
									<span
										className='text-gray text-xs'
										style={{ maxWidth: '100px' }}>
										{file.name}
									</span>
								</div>
							)}
						</div>
					))}
			</div>
			<div
				{...getRootProps()}
				className={`border-foreground mt-2 flex cursor-pointer items-center  justify-center  rounded-md border-2 p-5`}
				{...properties}>
				<input {...getInputProps()} />
				<p className='flex items-center gap-2'>
					<Pen color={Color.white} width={20} height={20} /> Select or drag and
					drop a picture here
				</p>
			</div>
		</div>
	)
}

export default Dropzone
