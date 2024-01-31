import type { EbookType } from '@/features/books/create/useBookCompose'
import EditEbook from '@/features/books/overview/edit-ebook'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getFileUrl } from 'global/api-config'
import type { FC } from 'react'
import * as React from 'react'

interface EbookInfoProperties {
	bookLink: string
	onEdit: (books: EbookType[]) => void
}

const EbookInfo: FC<EbookInfoProperties> = ({ bookLink, onEdit }) => {
	const { data: ebook } = useQuery({
		queryKey: ['book-preview', bookLink],
		queryFn: () =>
			axios
				.get<EbookType[]>(getFileUrl(bookLink))
				.then(response => response.data),
		enabled: !!bookLink
	})

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
						dangerouslySetInnerHTML={{
							__html: ebook.map(({ content }) => {
								return content
									.map(
										({ title, content }) =>
											`<label id="${title}"></label> ${content}`
									)
									.join(' ')
							})
						}}
						className=' mb-4 h-[700px] w-full overflow-y-scroll'
					></p>
				</TabsContent>
				<TabsContent value='edit'>
					<EditEbook onEdit={onEdit} ebook={ebook} />
				</TabsContent>
			</div>
		</Tabs>
	)
}

export default EbookInfo
