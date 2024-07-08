import { HtmlInfoChart } from '@/app/admin/book/_components/charts/html-info-chart'
import { Button } from '@/components/ui'
import Loader from '@/components/ui/loader/loader'
import api from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { QueryKeys } from 'global/utils/query-keys'
import { useRef, type FC } from 'react'
import { Pie, PieChart, Tooltip } from 'recharts'
import { reactions } from '../../../../../backend/src/book/ebook/helpers/reactions'

interface EbookInfoProperties {
	bookSlug: string
}
const getAllImages = (ebookFile: string) => {
	const parser = new DOMParser()
	const htmlDocument = parser.parseFromString(ebookFile, 'text/html')
	const images = htmlDocument.querySelectorAll('img')
	return [...images].map(image => ({
		src: image.src,
		id: image.id
	}))
}

export const getTagColor = (tag: string) => {
	switch (tag) {
		case 'P': {
			return Color.primary
		}
		case 'H1': {
			return '#A44200'
		}
		case 'H2': {
			;('#DAC4F7')
			return
		}
		case 'H3': {
			return '#AFD0BF'
		}
		case 'H4': {
			return '#4F5D75'
		}
		case 'H5': {
			return '#EF8354'
		}
		case 'H6': {
			return '#208AAE'
		}
		case 'A': {
			return '#D991BA'
		}
		case 'SPAN': {
			return '#8CAE68'
		}
		case 'DIV': {
			return '#F4A261'
		}
		case 'IMG': {
			return '#2A9D8F'
		}
		case 'UL': {
			return '#E9C46A'
		}
		case 'OL': {
			return '#F4A261'
		}
		case 'LI': {
			return '#E76F51'
		}
		default: {
			return '#E63946'
		}
	}
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
			<HtmlInfoChart
				data={Object.entries(
					[
						...new DOMParser()
							.parseFromString(ebook.file, 'text/html')
							.querySelectorAll('*')
					]
						.map(tag => tag.nodeName)
						.reduce((accumulator, tag) => {
							if (tag === 'P') return accumulator
							if (tag === 'BODY') return accumulator
							if (tag === 'HTML') return accumulator
							if (tag === 'HEAD') return accumulator
							if (tag === 'DIV') return accumulator
							// @ts-ignore
							accumulator[tag] = accumulator[tag] ? accumulator[tag] + 1 : 1
							return accumulator
						}, {})
				).map(([name, value]) => ({ name, value, fill: getTagColor(name) }))}
			/>
			<PieChart width={730} height={250}>
				<Pie
					label
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					innerRadius={60}
					outerRadius={80}
					fill={Color.primary}
					color={Color.white}
					data={Object.entries(
						[
							...new DOMParser()
								.parseFromString(ebook.file, 'text/html')
								.querySelectorAll('*')
						]
							.map(tag => tag.nodeName)
							.reduce((accumulator, tag) => {
								if (tag === 'P') return accumulator
								if (tag === 'BODY') return accumulator
								if (tag === 'HTML') return accumulator
								if (tag === 'HEAD') return accumulator
								// @ts-ignore
								accumulator[tag] = accumulator[tag] ? accumulator[tag] + 1 : 1
								return accumulator
							}, {})
					).map(([name, value]) => ({ name, value }))}
				/>
				<Tooltip />
			</PieChart>
			<div className='border-bordered mb-4 flex  gap-5 overflow-y-scroll p-2'>
				{getAllImages(ebook.file).map(image => {
					if (image.src.includes(ebook.picture)) return
					if (reactions.some(reaction => reaction.gif === image.src)) return
					if (['text-menu-share', 'text-menu-translate'].includes(image.id))
						return
					return (
						<img
							src={image.src}
							key={image.src}
							width={200}
							className='object-contain'
						/>
					)
				})}
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
			<div className='border-bordered mb-4 w-full  rounded border-[1px] p-2'>
				<div
					ref={reference}
					dangerouslySetInnerHTML={{
						__html: ebook.file
					}}
				/>
			</div>
		</div>
	)
}

export default BookOverview
