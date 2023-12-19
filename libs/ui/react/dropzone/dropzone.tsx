import { useCallback, useState } from 'react'
import { File } from '../../../global/icons/react'
import { Color } from '../../colors'
import type { DropzoneProperties } from './types'


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

const Dropzone =
	({
		 onDropFile = () => {},
		 className = '',
		 defaultFiles = [],
		 multiple = false,
		 disabled = false,
		 accept = 'image/*',
		 color = 'foreground',
		 onFileDelete = () => {},
		 style,
		 size = 'sm',
		 ...properties
	 }: DropzoneProperties) => {
		const [files, setFiles] = useState<File[]>(defaultFiles)
		const onDrop = useCallback(
			(acceptedFiles: File[]) => {
				if (!multiple) return setFiles(acceptedFiles)
				setFiles([...files, ...acceptedFiles])
				onDropFile(acceptedFiles)
			},
			[files, onDropFile]
		)
		
		return (
			<div className={`${maxWidhtSettings[size]} ${className}`} style={style}>
				<div
					className={`flex gap-2 overflow-scroll ${
						files.length === 0 && 'hidden'
					}`}
				>
					{files.length > 0 &&
						files.map(file => (
							<div key={file.name + file.type} className="items-center">
								<div
									onClick={() => {
										setFiles(files.filter(f => f.name !== file.name))
										onFileDelete(file)
									}}
									className={`mb-2 items-center justify-center border-2 text-center ${colorPallete[color]}`}
								>
									<File
										color={Color.white}
										className="mx-auto mb-1"
										width={45}
										height={45}
									/>
									<span
										className="text-gray text-xs"
										style={{ maxWidth: '100px' }}
									>
										{file.name}
									</span>
								</div>
							</div>
						))}
				</div>
				<div
					className={`mt-2 flex cursor-pointer items-center  justify-center  rounded-md border-2  ${sizeSettings[size]} ${colorPallete[color]}`}
					{...properties}
				>
					<input
						multiple={multiple}
						type="file"
						disabled={disabled}
						accept={accept}
						name="file"
						onChange={(e) => {
							if (e.target.files) {
								onDrop([...e.target.files])
							}
						}}
					/>
				</div>
			</div>
		)
	}

export default Dropzone
