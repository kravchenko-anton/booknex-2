import {
	callParserValidation,
	CallParserValidationType
} from '@/app/admin/parser/parse-modal/call-parser.dto'
import { defaultParserLinks } from '@/app/admin/parser/parse-modal/parse-links'
import { Button, Field } from '@/components/ui'
import type { DialogProperties } from '@/components/ui/base-components-types'
import { SheetComponent, SheetHeader } from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'

import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface NewParserPopupProperties extends DialogProperties {
	onSubmit: (data: { url: string; page: number }) => void
	parseLoading: boolean
}

const CallParserDialog: FC<NewParserPopupProperties> = properties => {
	const { control, handleSubmit, setValue } = useForm<CallParserValidationType>(
		{
			resolver: zodResolver(callParserValidation)
		}
	)
	return (
		<SheetComponent isOpen={properties.isOpen} onClose={properties.onClose}>
			<SheetHeader className='pb-4'>
				<h1 className='text-3xl font-medium'>Parse </h1>
			</SheetHeader>
			<Field control={control} variant='muted' name='url' placeholder='Link' />
			<Field
				variant='muted'
				control={control}
				className='my-2'
				name='page'
				placeholder='page'
				type='number'
			/>

			<div className='flex flex-wrap gap-2'>
				{defaultParserLinks.map(({ title, link }) => (
					<Button
						key={title}
						variant='muted'
						size='sm'
						onClick={() => {
							setValue('url', link)
						}}>
						{title}
					</Button>
				))}
			</div>
			<Button
				size='sm'
				isLoading={properties.parseLoading}
				variant='primary'
				className='mx-auto mt-4'
				onClick={handleSubmit(properties.onSubmit)}>
				Parse
			</Button>
		</SheetComponent>
	)
}

export default CallParserDialog
