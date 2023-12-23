import PressableContainer from '@/components/animated-press/animated-press'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { FC } from 'react'
import { Flatlist, Title } from 'ui/components'

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
							backgroundColor: colorScheme.colorPalette.background.darker
						}}
						className='mb-4 rounded-md p-4'
					>
						<Title
							style={{
								color: colorScheme.colorPalette.text
							}}
							weight='bold'
							size={22}
						>
							toc
							{/* {toc.label.trim()}*/}
						</Title>
					</PressableContainer>
				)
			}}
		/>
	)
}

export default ChaptersList
