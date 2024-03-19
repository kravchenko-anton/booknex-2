import Editor from '@/app/admin/book/_shared/book-editor/editor'
import { Button } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import api from '@/services'
import { errorToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { PayloadEBook } from 'global/api-client'
import { useState, type FC } from 'react'

interface EbookInfoProperties {
	bookId: number
	onSuccess: () => void
}

const BookOverview: FC<EbookInfoProperties> = ({ bookId, onSuccess }) => {
	const { data: ebook } = useQuery({
		queryKey: ['stored-ebook', bookId],
		queryFn: () => api.book.storedEbook(bookId),
		enabled: !!bookId,
		select: data => data.data
	})
	const { mutateAsync: updateEbook, isLoading: updateEbookLoading } =
		useMutation({
			mutationKey: ['update-ebook'],
			mutationFn: ({ id, payload }: { id: number; payload: PayloadEBook[] }) =>
				api.book.updateEbook(id, payload),
			onSuccess: onSuccess
		})
	const [books, setBooks] = useState<PayloadEBook[] | []>([])
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
								__html: ebook.map(({ chapters, title }) =>
									chapters
										.map(
											({ name, text, romanNumber }) => `<div
                       id="${name + ' ' + title}">
											<div style="
												width: 100%;
												height: 80px;
												display: flex;
												justify-content: center;
												align-items: center;
												text-align: center;">
												<h2 style="font-size: 24px">${romanNumber}</h2>
											</div>
											 ${text}
											</div>`
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
						disabled={updateEbookLoading}
						variant='primary'
						onClick={async () => {
							if (!books) return errorToast('Error saving book')
							await updateEbook({ id: bookId, payload: books })
						}}
					>
						Save
					</Button>
				</TabsContent>
			</div>
		</Tabs>
	)
}

export default BookOverview
