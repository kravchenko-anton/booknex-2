'use client'

import { ParserTable } from '@/app/admin/parser/catalog/_table/parser-table'
import Loader from '@/components/ui/loader/loader'
import { Suspense, type FC } from 'react'

const Parser: FC = () => (
	<Suspense fallback={<Loader />}>
		<ParserTable />
	</Suspense>
)

export default Parser
