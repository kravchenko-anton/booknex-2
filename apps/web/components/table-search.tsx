import { Field } from '@/components/ui'
import { Search } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'

interface DataTableHeaderProperties {
	onSearchSubmit: (data: { search: string }) => void
	defaultTerm: string
	title?: string
}
const DataTableHeader: FC<PropsWithChildren<DataTableHeaderProperties>> = ({
	children,
	defaultTerm,
	onSearchSubmit
}) => {
	const { control, handleSubmit } = useForm<{ search: string }>({
		mode: 'onSubmit'
	})

	return (
		<div className=' flex w-full items-center justify-between  p-3'>
			<h1 className='text-3xl font-medium'>Parser</h1>
			<div className='flex gap-5'>
				<form onSubmit={handleSubmit(onSearchSubmit)}>
					<Field
						control={control}
						icon={Search}
						name='search'
						defaultValue={defaultTerm}
						placeholder='Explore...'
						type='search'
					/>
				</form>
				{children}
			</div>
		</div>
	)
}

export default DataTableHeader
