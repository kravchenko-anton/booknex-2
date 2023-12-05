import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Pen } from '../../../../libs/global/icons/react'
import { Color } from '../../../../libs/ui/colors'
import { errorToast } from '../../utils/toast'

interface DropzoneProperties<T> {
	isMultiple?: T
	onDropFile: (acceptedFiles: T extends true ? File[] : File) => void
}

const Dropzone = <T extends boolean>({
	onDropFile,
	isMultiple
}: DropzoneProperties<T>) => {
	const [files, setFiles] = useState<File[]>([])
	const onDrop = useCallback(acceptedFiles => {
		if (acceptedFiles.length > 1 && !isMultiple) {
			errorToast('Only one file is allowed')
			return
		}

		setFiles(acceptedFiles)
		onDropFile(acceptedFiles)
	}, [])
	const { getRootProps, getInputProps } = useDropzone({
		onDrop
	})
	console.log(files)
	return (
		<div>
			{files.length > 0 &&
				files.map(file => (
					<div key={file.name} className='flex items-center gap-2'>
						<img
							className='h-20 w-20 rounded-md'
							src={URL.createObjectURL(file)}
							alt={file.name}
						/>
					</div>
				))}
			<div
				{...getRootProps()}
				className='border-foreground mt-2 flex cursor-pointer items-center  justify-center  rounded-md border-2 p-4'>
				<input {...getInputProps()} />
				<p className='flex items-center gap-2'>
					<Pen color={Color.white} width={20} height={20} /> Select or drag and
					drop a picture{isMultiple ? 's' : ''} here
				</p>
			</div>
		</div>
	)
}

export default Dropzone
