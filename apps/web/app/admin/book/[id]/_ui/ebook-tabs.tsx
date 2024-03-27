import { Button } from '@/components/ui'
import api from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { getServerBookHtml } from 'global/helpers/getBookHtml'
import { FC, useRef } from 'react'

interface EbookInfoProperties {
	bookId: number
}

const BookOverview: FC<EbookInfoProperties> = ({ bookId }) => {
	const { data: ebook } = useQuery({
		queryKey: ['stored-ebook', bookId],
		queryFn: () => api.ebook.storedEbook(bookId),
		enabled: !!bookId,
		select: data => data.data
	})
	const ref = useRef<HTMLParagraphElement>(null)
	const chapters = ebook?.map(({ title, chapters }) =>
		chapters.map(({ name }) => ({
			name,
			link: `#${name + ' ' + title}`
		}))
	)
	return (
		<div className='mt-4 p-2'>
			<div className='border-bordered mb-4 h-[600px] min-h-[600px] w-full overflow-y-scroll rounded border-[1px] p-2'>
				<p
					ref={ref}
					dangerouslySetInnerHTML={{
						__html:
							ebook?.map(({ chapters, title }) =>
								chapters
									.map(({ text, name, romanNumber, readingTime }) =>
										getServerBookHtml({
											name,
											romanNumber,
											readingTime,
											text,
											title
										})
									)
									.join(' ')
							) || ''
					}}
				/>
			</div>
			<div className=' flex gap-2 overflow-auto pb-2'>
				{chapters?.map(children =>
					children.map(({ name, link }) => {
						return (
							<Button
								size={'sm'}
								onClick={() => {
									window.location.href = link
								}}>
								{name}
							</Button>
						)
					})
				)}
			</div>
		</div>
	)
}

export default BookOverview
