'use client'

import { useParams } from 'next/navigation'

const Page = () => {
	const parameters = useParams()
	return <div>BookOverview {parameters.id}</div>
}
export default Page
