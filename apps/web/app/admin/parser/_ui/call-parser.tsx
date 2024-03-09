import {
	callParserDto,
	type CallParserDtoType
} from '@/app/admin/parser/_ui/validation'
import { Button, Field } from '@/components/ui'
import type { DialogProperties } from '@/components/ui/base-components-types'
import { SheetComponent, SheetHeader } from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface NewParserPopupProperties extends DialogProperties {
	onSubmit: (data: { link: string; page: number }) => void
}

const defaultParserLinks = [
	{
		title: 'best books ever',
		link: 'https://www.goodreads.com/list/show/1.Best_Books_Ever'
	},
	{
		title: 'best fantasy books',
		link: 'https://www.goodreads.com/list/show/47.Best_Fantasy_Books'
	},
	{
		title: 'best romance books',
		link: 'https://www.goodreads.com/list/show/24843.Best_Romance_Books'
	},
	{
		title: 'best science fiction books',
		link: 'https://www.goodreads.com/list/show/6.Best_Science_Fiction_Books'
	},
	{
		title: 'best horror books',
		link: 'https://www.goodreads.com/list/show/47.Best_Horror_Books'
	},
	{
		title: 'best mystery books',
		link: 'https://www.goodreads.com/list/show/12.Best_Mystery_Books'
	},
	{
		title: 'best thriller books',
		link: 'https://www.goodreads.com/list/show/348.Best_Thriller_Books_Ever'
	},
	{
		title: 'best historical fiction books',
		link: 'https://www.goodreads.com/list/show/12.Best_Historical_Fiction_Books'
	}
]

const CallParserDialog: FC<NewParserPopupProperties> = properties => {
	const { control, handleSubmit, setValue } = useForm<CallParserDtoType>({
		resolver: zodResolver(callParserDto)
	})
	return (
		<SheetComponent isOpen={properties.isOpen} onClose={properties.onClose}>
			<SheetHeader className='pb-4'>
				<h1 className='text-3xl font-medium'>Parse </h1>
			</SheetHeader>
			<Field control={control} variant='muted' name='link' placeholder='Link' />
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
							setValue('link', link)
						}}
					>
						{title}
					</Button>
				))}
			</div>
			<Button
				size='sm'
				variant='primary'
				className='mx-auto mt-4'
				onClick={handleSubmit(properties.onSubmit)}
			>
				Parse
			</Button>
		</SheetComponent>
	)
}

export default CallParserDialog
