import { Footer } from '@/app/(landing)/footer'
import { ScreensDemoSection } from '@/app/(landing)/screens-demo-section'
import { ShowcaseSection } from '@/app/(landing)/showcase-section'
import { NavigationBar } from '@/components/navigationBar/navigation-bar'
import { Button } from '@/components/ui'
import api from '@/services/api'
import { appName, installAppLink } from 'global/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: appName
}
const getData = async () => {
	const { data } = await api.catalog.picksOfTheWeek()
	return {
		picksOfTheWeek: data
	}
}

const Index = async () => {
	const { picksOfTheWeek } = await getData()
	return (
		<div>
			<NavigationBar />
			<div
				className='bg-foreground flex h-[60vh] items-center justify-center p-4 text-center'
				id='main'>
				<div>
					<h1 className='mb-4 line-clamp-2 text-4xl'>
						The easiest way to enjoy books
					</h1>
					<p>
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

			<ShowcaseSection
				picksOfTheWeek={picksOfTheWeek.map(book => book.picture)}
			/>
			<ScreensDemoSection />
			<Footer />
		</div>
	)
}

export default Index
