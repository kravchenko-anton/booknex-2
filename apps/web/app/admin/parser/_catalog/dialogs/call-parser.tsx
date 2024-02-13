import { Button, Field } from '@/components/ui'
import type { DialogProperties } from '@/components/ui/base-components-types'
import { SheetComponent, SheetHeader } from '@/components/ui/sheet'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface NewParserPopupProperties extends DialogProperties {
	onSubmit: (data: { link: string; page: number }) => void
	defaultValues?: {
		link: string
		page: number
	}
}

const CallParserDialog: FC<NewParserPopupProperties> = properties => {
	const { control, handleSubmit } = useForm<{
		link: string
		page: number
	}>()
	return (
		<SheetComponent isOpen={properties.isOpen} onClose={properties.onClose}>
			<SheetHeader className='pb-4'>
				<h1 className='text-3xl font-medium'>Parse </h1>
			</SheetHeader>
			<Field
				control={control}
				variant='muted'
				defaultValue={properties.defaultValues?.link}
				name='link'
				placeholder='Link'
			/>
			<Field
				variant='muted'
				control={control}
				defaultValue={properties.defaultValues?.page}
				className='my-2'
				name='page'
				placeholder='Id'
				type='number'
			/>
			<Button
				size='sm'
				variant='primary'
				className='mx-auto'
				onClick={handleSubmit(properties.onSubmit)}
			>
				Parse
			</Button>
		</SheetComponent>
	)
}

export default CallParserDialog
