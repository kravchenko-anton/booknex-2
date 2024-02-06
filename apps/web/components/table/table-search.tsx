import { Field } from '@/components/ui'
import { Search } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'

interface DataTableHeaderProperties {
	onSearchSubmit: (data: { searchTerm: string }) => void
	defaultTerm: string
	title?: string
}
const DataTableHeader: FC<PropsWithChildren<DataTableHeaderProperties>> = ({
	children,
	defaultTerm,
	title = '',
	onSearchSubmit
}) => {
	const { control, handleSubmit } = useForm<{ searchTerm: string }>({
		mode: 'onSubmit'
	})

	return (
		<div className=' flex w-full items-center justify-between  p-3'>
			<h1 className='text-3xl font-medium'>{title}</h1>
			<div className='flex gap-5'>
				<form onSubmit={handleSubmit(onSearchSubmit)}>
					<Field
						control={control}
						icon={Search}
						name='searchTerm'
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
