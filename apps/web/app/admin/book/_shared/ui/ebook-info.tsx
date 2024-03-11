import Editor from '@/app/admin/book/_shared/book-compose/editor'
import { Button } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { errorToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { PayloadEBook } from 'global/api-client'
import { getFileUrl } from 'global/api-config'
import { useState, type FC } from 'react'

interface EbookInfoProperties {
	bookLink: string
	onEdit: (books: PayloadEBook[]) => void
}

const EbookInfo: FC<EbookInfoProperties> = ({ bookLink, onEdit }) => {
	const { data: ebook } = useQuery({
		queryKey: ['book-preview', bookLink],
		queryFn: () =>
			axios
				.get<PayloadEBook[]>(getFileUrl(bookLink))
				.then(response => response.data),
		enabled: !!bookLink
	})
	const [books, setBooks] = useState<PayloadEBook[] | null>(null)
	if (!ebook) return null
	return (
		<Tabs defaultValue='preview' className=' mt-8 w-full '>
			<TabsList>
				<TabsTrigger value='preview'>Preview Ebook</TabsTrigger>
				<TabsTrigger value='edit'>Edit</TabsTrigger>
			</TabsList>
			<div className=' border-bordered mt-4 border-[1px] p-2'>
				<TabsContent value='preview'>
					<div className='mb-4 h-[600px] min-h-[600px] w-full overflow-y-scroll'>
						<p
							dangerouslySetInnerHTML={{
								__html: ebook.map(({ chapters }) =>
									chapters
										.map(
											({ name, text }) => `<label id="${name}"></label> ${text}`
										)
										.join(' ')
								)
							}}
						/>
					</div>
				</TabsContent>
				<TabsContent value='edit'>
					<Editor
						defaultBooks={ebook}
						updateBooks={(value: PayloadEBook[]) => setBooks(value)}
					/>
					<Button
						size='md'
						variant='primary'
						onClick={() => {
							if (!books) return errorToast('Error saving book')
							onEdit(books)
						}}
					>
						Save
					</Button>
				</TabsContent>
			</div>
		</Tabs>
	)
}

export default EbookInfo
