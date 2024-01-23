import { Button, Field } from '@/components/ui'
import { SheetHeader } from '@/components/ui/sheet'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface NewParserPopupProperties {
	onSubmit: (data: { link: string; page: number }) => void
	defaultValues?: {
		link: string
		page: number
	}
}

const CallParser: FC<NewParserPopupProperties> = ({
	onSubmit,
	defaultValues = {}
}) => {
	const { control, handleSubmit } = useForm<{
		link: string
		page: number
	}>()
	return (
		<div>
			<SheetHeader className='pb-4'>
				<h1 className='text-3xl font-medium'>Parse </h1>
			</SheetHeader>
			<Field
				control={control}
				variant='muted'
				defaultValue={defaultValues.link}
				name='link'
				placeholder='Link'
			/>
			<Field
				variant='muted'
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

export default CallParser
