'use client'
import { useData } from '@/features/author/catalog/useData'
import CreateAuthor from '@/features/author/sheets/create/create-author'
import { Button } from '@/shared/ui'
import DataTable from '@/widgets/table/data-table'
import DataTableHeader from '@/widgets/table/table-search'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FC } from 'react'

const Page: FC = () => {
	const { headerProperties, tableProperties } = useData()
	const parameters = useSearchParams()
	const router = useRouter()
	return (
		<div className='w-full'>
			<DataTableHeader title='Authors' {...headerProperties}>
				<Button
					onClick={() => {
						router.push('/authors/catalog?modal=create')
					}}
					size='sm'
					variant='primary'
				>
					Create
				</Button>
			</DataTableHeader>
			<CreateAuthor
				onCreate={() => {}}
				onOpenChange={() => {
					console.log('close')
					router.push('/authors/catalog')
				}}
				open={parameters.get('modal') === 'create'}
			/>
			<DataTable {...tableProperties} />
		</div>
	)
}

export default Page
