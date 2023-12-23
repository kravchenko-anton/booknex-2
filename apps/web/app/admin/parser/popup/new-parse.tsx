import { Button, Field } from '@/ui/components'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface NewParserPopupProperties {
	onSubmit: (data: { link: string; page: number }) => void
	defaultValues?: {
		link: string
		page: number
	}
}

const NewParse: FC<NewParserPopupProperties> = ({
	onSubmit,
	defaultValues = {}
}) => {
	const { control, handleSubmit } = useForm<{
		link: string
		page: number
	}>()
	return (
		<div className='w-[250px] p-4'>
			<Field
				control={control}
				variant='vibrant'
				defaultValue={defaultValues.link}
				name='link'
				placeholder='Link'
			/>
			<Field
				variant='vibrant'
				control={control}
				defaultValue={defaultValues.page}
				className='my-2'
				name='page'
				placeholder='Page'
				type='number'
			/>
			<Button
				variant='primary'
				className='mx-auto'
				onClick={handleSubmit(onSubmit)}
			>
				Parse
			</Button>
		</div>
	)
}

export default NewParse
