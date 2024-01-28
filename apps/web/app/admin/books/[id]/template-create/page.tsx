import { useParams } from 'next/navigation'

const Page = () => {
	const parameters = useParams()
	return <div>Template create ${parameters.id}</div>
}

export default Page
