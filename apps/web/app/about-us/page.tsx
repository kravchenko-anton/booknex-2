import { NavigationBar } from '@/components/navigationBar/navigation-bar'
import { Button } from '@/components/ui'
import { appName, mailLink, socialLinks } from 'global/utils'
import Image from 'next/image'
import Link from 'next/link'
import DeveloperLogo from '../../public/dev-logo.png'

const Page = () => (
	<div>
		<NavigationBar />
		<div className='mx-auto w-[40%] pt-8'>
			<h1 className='text-3xl font-light'>About {appName}</h1>

			<h3 className='mb-2 mt-4 text-xl font-bold'>Our mission</h3>

			<p className=' text-lg font-light'>
				Our mission is to provide a platform where readers can access a wide
				range of books from all genres. We want to make reading more accessible
				and enjoyable for everyone.
			</p>

			<h3 className='mt-4 text-xl font-bold'>Our Author</h3>
			<div className='flex items-center justify-between gap-5 py-4'>
				<div className='w-full'>
					<Image
						src={DeveloperLogo}
						alt={'Anton Kravchenko'}
						width={250}
						height={250}
						objectFit='cover'
						className={'object-cover'}
					/>
				</div>
				<div>
					<h1 className='mb-2 text-2xl'>Anton Kravchenko</h1>
					<p className='text-md font-light'>
						Lead developer at {appName}. Anton is a software engineer with a
						passion for creating innovative solutions. He is dedicated to
						providing the best possible experience for our users.
					</p>
					<div className='mt-4 flex gap-2'>
						<Link href={mailLink}>
							<Button variant='danger' size='sm'>
								Mail
							</Button>
						</Link>
						<Link href={socialLinks.telegram}>
							<Button variant='primary' size='sm'>
								Telegram
							</Button>
						</Link>
						<Link href={socialLinks.github}>
							<Button variant='foreground' size='sm'>
								Github
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default Page
