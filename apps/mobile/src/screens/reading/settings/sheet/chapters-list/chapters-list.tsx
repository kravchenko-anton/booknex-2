import PressableContainer from '@/components/pressable-container/pressable-container'
import Flatlist from '@/components/ui/flatlist/flatlist'
import Title from '@/components/ui/title/title'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { FC } from 'react'

const ChaptersList: FC = () => {
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	return (
		<Flatlist
			mt={0}
			data={[]}
			className='mt-2 h-full px-4'
			renderItem={({ item: toc }) => {
				console.log(toc)
				return (
					<PressableContainer
						style={{
							backgroundColor: colorScheme.colorPalette.background
						}}
						className='mb-4 rounded-xl p-4'>
						<Title
							style={{
								color: colorScheme.colorPalette.text
							}}
							weight={'bold'}
							size={22}>
							{/* {toc.label.trim()}*/}
						</Title>
					</PressableContainer>
				)
			}}
		/>
	)
}

export default ChaptersList
