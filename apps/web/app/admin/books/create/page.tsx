'use client'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import type { FC } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../../../components/button/button'
import Dropzone from '../../../../components/dropzone/dropzone'
import Field from '../../../../components/field/field'
import './tinymce.css'

const Page: FC = () => {
	const { control, handleSubmit, setValue } = useForm<{
		title: string
		picture: File
		pages: number
		genre: string[]
		popularity: number
		color: string
		likedPercentage: number
		description: string
	}>()

	return (
		<form
			onSubmit={handleSubmit(data => {
				console.log(data)
			})}>
			<h1 className='mb-2 text-center text-3xl font-medium'>Create</h1>
			<div className='flex  justify-between gap-10'>
				<div className='w-1/2'>
					<Field
						control={control}
						rules={{
							required: 'Title is required',
							minLength: {
								value: 3,
								message: 'Title must be at least 3 characters long'
							}
						}}
						name={'title'}
						placeholder='Title'
					/>
					<div className='mt-2 flex  justify-between'>
						<Field
							type={'number'}
							control={control}
							rules={{
								required: 'Pages is required',
								min: {
									value: 1,
									message: 'Pages must be greater than 0'
								}
							}}
							name={'pages'}
							placeholder='Pages'
						/>
						<Field
							type={'number'}
							rules={{
								required: 'Liked Percentage is required',
								min: {
									value: 1,
									message: 'Liked Percentage must be greater than 0'
								},
								max: {
									value: 100,
									message: 'Liked Percentage must be less than 100'
								}
							}}
							control={control}
							name={'likedPercentage'}
							placeholder={'Liked Percentage'}
						/>
						<Field
							type={'number'}
							control={control}
							rules={{
								required: 'Popularity is required',
								min: {
									value: 1,
									message: 'Popularity must be greater than 0'
								},
								max: {
									value: 100,
									message: 'Popularity must be less than 100'
								}
							}}
							className='mb-2'
							name={'popularity'}
							placeholder={'Popularity'}
						/>
					</div>
					<Controller
						control={control}
						name={'description'}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error }
						}) => (
							<>
								<Editor
									value={value}
									onBlur={onBlur}
									onChange={onChange}
									apiKey={process.env.TINYMCE}
									init={{
										height: 300,
										content_css: 'tinymce.css',
										plugins:
											'anchor autolink charmap codesample preview lists media searchreplace  visualblocks wordcount checklist mediaembed casechange pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
										toolbar:
											'undo redo | blocks  fontsize | bold italic underline strikethrough  align lineheight |  removeformat'
									}}
									initialValue='<p>This is the initial content of the editor.</p>'
								/>
								{!!error && (
									<p className={`text-danger mt-0.5 text-xs italic`}>
										{error.message}
									</p>
								)}
							</>
						)}
					/>
				</div>
				<div className='w-1/2'>
					<div className='flex justify-between'>
						<div>
							<h1 className='mb-2'>Book Picture</h1>
							<Dropzone<false>
								onDropFile={acceptedFiles => {
									setValue('picture', acceptedFiles[0])
									// create axios request to upload file
									axios.post('/api/upload', acceptedFiles[0])
								}}
							/>
						</div>
						<Controller
							control={control}
							name={'color'}
							render={({
								field: { value, onChange, onBlur },
								fieldState: { error }
							}) => (
								<>
									<HexColorPicker
										color={value}
										onBlur={onBlur}
										onChange={onChange}
									/>
									{!!error && (
										<p className={`text-danger mt-0.5 text-xs italic`}>
											{error.message}
										</p>
									)}
								</>
							)}
						/>
					</div>
				</div>
			</div>
			<Button className='mt-2' type='submit' color='primary'>
				Create
			</Button>
		</form>
	)
}

export default Page

//	<h1 className='mb-2'>Genre</h1>
// 							<Controller
// 								control={control}
// 								name={'genre'}
// 								render={({
// 									field: { value, onChange, onBlur },
// 									fieldState: { error }
// 								}) => (
// 									<>
// 										<Select
// 											isMulti
// 											className='w-[430px]'
// 											options={[
// 												{ label: 'Option 1', value: 'option-1' },
// 												{ label: 'Option 2', value: 'option-2' },
// 												{ label: 'Option 3', value: 'option-3' }
// 											]}
// 											onBlur={onBlur}
// 											onChange={onChange}
// 											value={value}
// 											placeholder={'Select'}
// 										/>
// 										{!!error && (
// 											<p className={`text-danger mt-0.5 text-xs italic`}>
// 												{error.message}
// 											</p>
// 										)}
// 									</>
// 								)}
// 							/>
// 						</div>
