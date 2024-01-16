import { Button, Field } from '@/components/ui'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface NewParserPopupProperties {
	onSubmit: (data: { link: string; page: number }) => void
	defaultValues?: {
		link: string
		page: number
	}
}

const CallParse: FC<NewParserPopupProperties> = ({
	onSubmit,
	defaultValues = {}
}) => {
	const { control, handleSubmit } = useForm<{
		link: string
		page: number
	}>()
	return (
		<div className=' pt-4'>
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
				placeholder='Id'
				type='number'
			/>
			<Button
				size='sm'
				variant='primary'
				className='mx-auto'
				onClick={handleSubmit(onSubmit)}
			>
				Parse
			</Button>
		</div>
	)
}

export default CallParse
