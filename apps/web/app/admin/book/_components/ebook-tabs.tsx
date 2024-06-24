import { Button } from '@/components/ui'
import Loader from '@/components/ui/loader/loader'
import api from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useRef, type FC } from 'react'

interface EbookInfoProperties {
	bookSlug: string
}
const getAllImages = (ebookFile: string) => {
	const parser = new DOMParser()
	const htmlDocument = parser.parseFromString(ebookFile, 'text/html')
	const images = htmlDocument.querySelectorAll('img')
	return [...images].map(image => image.src)
}

const BookOverview: FC<EbookInfoProperties> = ({ bookSlug }) => {
	const { data: ebook } = useQuery({
		queryKey: QueryKeys.ebook.bySlug(bookSlug),
		queryFn: () => api.ebook.ebookBySlug(bookSlug),
		enabled: !!bookSlug,
		select: data => data.data
	})
	const reference = useRef<HTMLParagraphElement>(null)

	if (!ebook) return <Loader />
	return (
		<div className='mt-4 p-2'>
			<div className='border-bordered mb-4 h-[600px] min-h-[600px] w-full overflow-y-scroll rounded border-[1px] p-2'>
				<div className='flex gap-5'>
					{getAllImages(ebook.file).map(image => (
						<img
							src={image}
							key={image}
							width={200}
							className='object-contain'
						/>
					))}
				</div>
				<div
					ref={reference}
					dangerouslySetInnerHTML={{
						__html: ebook.file
					}}
				/>
			</div>
			<div className=' flex gap-2 overflow-auto pb-2'>
				{ebook.chapters?.map(({ children }) =>
					children.map(({ name, link }) => (
						<Button
							size={'sm'}
							className='min-w-[200px]'
							onClick={() => {
								window.location.href = '#' + link
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
