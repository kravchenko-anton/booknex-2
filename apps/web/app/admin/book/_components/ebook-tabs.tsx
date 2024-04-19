import { Button } from '@/components/ui'
import api from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { getServerBookHtml } from 'global/helpers/getBookHtml'
import { QueryKeys } from 'global/utils/query-keys'
import { useRef, type FC } from 'react'

interface EbookInfoProperties {
	bookSlug: string
}

const BookOverview: FC<EbookInfoProperties> = ({ bookSlug }) => {
	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.storedEbookBySlug(bookSlug),
		queryFn: () => api.ebook.storedEbookBySlug(bookSlug),
		enabled: !!bookSlug,
		select: data => data.data
	})
	const reference = useRef<HTMLParagraphElement>(null)
	const chapters = ebook?.map(({ title, chapters }) =>
		chapters.map(({ name }) => ({
			name,
			link: `#${name + ' ' + title}`
		}))
	)

	return (
		<div className='mt-4 p-2'>
			<div className='border-bordered mb-4 h-[600px] min-h-[600px] w-full overflow-y-scroll rounded border-[1px] p-2'>
				<div
					ref={reference}
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
					children.map(({ name, link }) => (
						<Button
							size={'sm'}
							onClick={() => {
								window.location.href = link
							}}>
							{name}
						</Button>
					))
				)}
			</div>
		</div>
	)
}

export default BookOverview
