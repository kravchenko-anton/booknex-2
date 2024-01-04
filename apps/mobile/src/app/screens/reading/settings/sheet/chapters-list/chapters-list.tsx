import { useTypedSelector } from '@/hooks/useTypedSelector'
import { BottomSheetSectionList } from '@gorhom/bottom-sheet'
import type { FC } from 'react'
import { useMemo } from 'react'
import { Button, Title } from 'ui/components'

const ChaptersList: FC = () => {
	const sections = useMemo(
		() =>
			Array.from({ length: 10 })
				.fill(0)
				.map((_, index) => ({
					title: `Section ${index}`,
					data: Array.from({ length: 10 })
						.fill(0)
						.map((_, index) => `Item ${index}`)
				})),
		[]
	)

	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	return (
		<BottomSheetSectionList
			stickySectionHeadersEnabled
			sections={sections}
			className='mt-2 h-full px-4'
			renderSectionHeader={({ section }) => {
				return (
					<Title
						weight='bold'
						className='bg-foreground p-4'
						size={18}
						style={{ color: colorScheme.colorPalette.text }}
					>
						{section.title}
					</Title>
				)
			}}
			renderItem={({ item }) => {
				return (
					<Button size='md' className='mb-4 rounded-xl' text={item}></Button>
				)
			}}
		/>
	)
}

export default ChaptersList
