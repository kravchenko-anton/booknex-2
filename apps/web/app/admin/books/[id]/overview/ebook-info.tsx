import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import type { FC } from 'react'
import * as React from 'react'

interface EbookInfoProperties {
	bookLink: string
}

const EbookInfo: FC<EbookInfoProperties> = ({ bookLink }) => {
	return (
		<Tabs defaultValue='preview' className=' mt-8 w-full '>
			<TabsList>
				<TabsTrigger value='preview'>Preview Ebook</TabsTrigger>
				<TabsTrigger value='edit'>Edit</TabsTrigger>
			</TabsList>
			<TabsContent value='preview'>
				<p
					dangerouslySetInnerHTML={{
						__html: bookLink
					}}
					className='border-muted mb-4 h-[500px] w-full overflow-y-scroll border-[1px]'
				></p>
			</TabsContent>
			<TabsContent value='edit'>Edit book.</TabsContent>
		</Tabs>
	)
}

export default EbookInfo
