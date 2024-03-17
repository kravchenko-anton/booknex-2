import Editor from '@/app/admin/book/_shared/book-editor/editor'
import { Button } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import api from '@/services'
import { errorToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import type { PayloadEBook } from 'global/api-client'
import { useState, type FC } from 'react'

interface EbookInfoProperties {
	bookId: number
	isLoading: boolean
	onEdit: (books: PayloadEBook[]) => void
}

const EbookInfo: FC<EbookInfoProperties> = ({ isLoading, bookId, onEdit }) => {
	const { data: ebook } = useQuery({
		queryKey: ['book-preview', bookId],
		queryFn: () => api.book.storedEbook(bookId),
		enabled: !!bookId,
		select: data => data.data
	})
	const [books, setBooks] = useState<PayloadEBook[] | null>(null)
	if (!ebook) return null
	return (
		<Tabs defaultValue='preview' className=' mt-8 w-full'>
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
						isLoading={isLoading}
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
