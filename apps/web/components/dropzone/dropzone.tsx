import type { HTMLAttributes } from 'react'
import { useCallback, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { Pen } from '../../../../libs/global/icons/react'
import { Color } from '../../../../libs/ui/colors'

interface DropzoneProperties extends HTMLAttributes<HTMLDivElement> {
	options?: DropzoneOptions
	onDropFile: (files: File[] | File) => void
}

const Dropzone = ({
	onDropFile,
	className,
	options,
	style,
	...properties
}: DropzoneProperties) => {
	const [files, setFiles] = useState<File[]>([])
	const onDrop = useCallback(acceptedFiles => {
		setFiles(acceptedFiles)
		onDropFile(acceptedFiles)
	}, [])
	const { getRootProps, getInputProps } = useDropzone({
		onDrop, ...options
	})
	return (
		<div>
			{files.length > 0 &&
				files.map(file => (
					<div key={file.name} className='flex items-center gap-2'>
						<img
							onClick={() =>
								setFiles(files.filter(f => f.name !== file.name))
						}
							className='h-20 w-20 rounded-md'
							src={URL.createObjectURL(file)}
							alt={file.name}
						/>
					</div>
				))}
			<div
				{...getRootProps()}
				className={`border-foreground mt-2 flex cursor-pointer items-center  justify-center  rounded-md border-2 p-5 ${
					className || ''
				}`}
				style={style}
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
