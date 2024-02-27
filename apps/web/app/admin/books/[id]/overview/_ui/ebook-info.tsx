import Editor from '@/app/admin/books/_shared/book-compose/editor'
import { ebookValidation } from '@/app/admin/books/_shared/ebook-validation'
import { Button } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { errorToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { EBookType } from 'backend/src/book/types'
import { getFileUrl } from 'global/api-config'
import { useState, type FC } from 'react'

interface EbookInfoProperties {
	bookLink: string
	onEdit: (books: EBookType) => void
}

const EbookInfo: FC<EbookInfoProperties> = ({ bookLink, onEdit }) => {
	const { data: ebook } = useQuery({
		queryKey: ['book-preview', bookLink],
		queryFn: () =>
			axios
				.get<EBookType>(getFileUrl(bookLink))
				.then(response => response.data),
		enabled: !!bookLink
	})
	const [books, setBooks] = useState<EBookType | null>(null)
	if (!ebook) return null
	return (
		<Tabs defaultValue='preview' className=' mt-8 w-full '>
			<TabsList>
				<TabsTrigger value='preview'>Preview Ebook</TabsTrigger>
				<TabsTrigger value='edit'>Edit</TabsTrigger>
			</TabsList>
			<div className=' border-muted mt-4 border-[1px] p-2'>
				<TabsContent value='preview'>
					<p
						className='mb-4 h-[700px] w-full overflow-y-scroll'
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
				</TabsContent>
				<TabsContent value='edit'>
					<Editor
						defaultBooks={ebook}
						updateBooks={(value: EBookType) => setBooks(value)}
					/>
					<Button
						size='md'
						variant='primary'
						onClick={() => {
							ebookValidation
								.parseAsync(books)
								.then(value => onEdit(value))
								.catch(error => {
									errorToast(error)
								})
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
