import Layout from '@/components/layout/layout'
import CheckEmail from '@/screens/auth/welcome/check-email/check-email'
import DescriptionCard from '@/screens/auth/welcome/description-card/description-card'
import type { FC } from 'react';
import { useState } from 'react'

const Welcome: FC = () => {
	const [activePopup, setIsActivePopup] = useState<
		'check-email' | 'description-card'
	>('description-card')

	return (
		<Layout className='relative justify-center p-4'>
			<DescriptionCard
				isActivePopup={activePopup === 'description-card'}
				setIsActivePopup={setIsActivePopup}
			/>
			<CheckEmail isActivePopup={activePopup === 'check-email'} />
		</Layout>
	)
}

export default Welcome
