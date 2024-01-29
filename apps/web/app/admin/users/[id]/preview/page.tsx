'use client'
import { useParams } from 'next/navigation'

const Page = () => {
	const parameters = useParams()
	return <div>Page {parameters.id}</div>
}

export default Page
