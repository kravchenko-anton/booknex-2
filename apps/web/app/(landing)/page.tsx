import { ScreensDemoSection } from '@/app/(landing)/screens-demo-section'
import { ShowcaseSection } from '@/app/(landing)/showcase-section'
import { Button } from '@/components/ui'
import api from '@/services/api'
import { appName, installAppLink } from 'global/utils'
import Link from 'next/link'

const getData = async () => {
	const { data } = await api.catalog.picksOfTheWeek()
	return {
		picksOfTheWeek: data
	}
}
export const revalidate = 3600

const Index = async () => {
	const { picksOfTheWeek } = await getData()
	return (
		<div>
			<div
				className='bg-foreground flex h-[60vh] items-center justify-center p-4 text-center'
				id='main'>
				<div>
					<h1 className='mb-4 line-clamp-2 text-2xl md:text-4xl'>
						The easiest way to enjoy books
					</h1>
					<p className='text-sm md:text-xl'>
						{appName} is a mobile reading app that’s filled with thousands of
						books.
					</p>
					<Link href={installAppLink}>
						<Button variant='primary' className='mx-auto mt-4' size={'md'}>
							Download now
						</Button>
					</Link>
				</div>
			</div>

			<ShowcaseSection picksOfTheWeek={picksOfTheWeek} />
			<ScreensDemoSection />
		</div>
	)
}

export default Index
