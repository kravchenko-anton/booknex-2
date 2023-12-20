import { useCallback, useState } from 'react'
import { File } from '../../../global/icons/react'
import { Color } from '../../colors'
import { StyledDropzone, StyledFileBlock, StyledFileBlockWrapper } from './styles'
import type { DropzoneProperties } from './types'


const Dropzone =
	({
		 onDropFile = () => {},
		 defaultFiles = [],
		 multiple = false,
		 disabled = false,
		 accept = 'image/*',
		 color = 'foreground',
		 onFileDelete = () => {},
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
			<div>
				<StyledFileBlockWrapper hidden={files.length === 0}>
					{files.map(file => (
						<div key={file.name + file.type}>
							<StyledFileBlock
								color={color}
								onClick={() => {
									setFiles(files.filter(f => f.name !== file.name))
									onFileDelete(file)
								}}
							>
								<File
									color={Color.white}
									width={45}
									height={45}
								/>
								<span>{file.name}</span>
							</StyledFileBlock>
						</div>
					))}
				</StyledFileBlockWrapper>
				<StyledDropzone
					color={color}
					size={size}
					{...properties}
				>
					<input
						multiple={multiple}
						type="file"
						disabled={disabled}
						accept={accept}
						onChange={(event) => {
							if (event.target.files) onDrop([...event.target.files as unknown as File[]])
						}}
					/>
				</StyledDropzone>
			</div>
		)
	}

export default Dropzone
