import { Button } from '@/components/ui'
import { appName } from 'global/utils'

const Index = () => (
	<div
		className='bg-foreground  flex h-[60vh] items-center justify-center p-4 text-center'
		id='main'>
		<div>
			<h1 className='mb-2 line-clamp-2 text-4xl'>
				The easiest way to enjoy books
			</h1>
			<p>
				{appName} is a mobile reading app that’s filled with thousands of books.
			</p>
			<Button variant='primary' className='mx-auto mt-2' size={'md'}>
				Dowload now
			</Button>
		</div>
	</div>
)

export default Index
