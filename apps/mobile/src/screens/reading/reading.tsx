import { useTypedRoute } from '@/hooks/useTypedRoute'
import { Reader } from '@/screens/reading/reader/reader'
import ReadingUi from '@/screens/reading/settings/reading-ui'
import { SafeAreaView } from 'react-native-safe-area-context'
// TODO: сделать тут вертикальный скролл и настройки
const Reading = () => {
	const { params } = useTypedRoute<'Reading'>()

	return (
		<SafeAreaView className='flex-1'>
			<Reader id={params.id} src={params.epub} />
			<ReadingUi />
		</SafeAreaView>
	)
}
export default Reading
