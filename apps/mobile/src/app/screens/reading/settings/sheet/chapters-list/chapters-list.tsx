import { BottomSheetSectionList } from '@gorhom/bottom-sheet'
import type { FC } from 'react'
import { useMemo } from 'react'
import { Pressable } from 'react-native'
import { Color } from 'ui/colors'
import { Title } from 'ui/components'

const ChaptersList: FC<{
	openChapter: (chapterId: string) => void
	chapters: {
		name: string
		children: {
			name: string
			link: string
		}[]
	}[]
}> = ({ chapters, openChapter }) => {
	const sections = useMemo(() => {
		return chapters.map(chapter => {
			return {
				title: chapter.name,
				data: chapter.children.map(child => {
					return {
						title: child.name,
						link: child.link
					}
				})
			}
		})
	}, [chapters])

	return (
		<BottomSheetSectionList
			stickySectionHeadersEnabled
			scrollToOverflowEnabled={true}
			sections={sections}
			showsVerticalScrollIndicator={false}
			className='mt-2 h-full px-4'
			renderSectionHeader={({ section }) => {
				return (
					<Title
						weight='bold'
						className='bg-foreground border-vibrant mt-[-1px] border-b-[1px] p-4'
						size={22}
						style={{
							backgroundColor: Color.foreground
						}}
					>
						{section.title}
					</Title>
				)
			}}
			renderItem={({ item }) => {
				return (
					<Pressable
						onPress={() => {
							openChapter(item.link)
						}}
						className='bg-shade border-vibrant w-full border-b-[1px] p-4'
					>
						<Title size={18} weight='semiBold'>
							{item.title}
						</Title>
					</Pressable>
				)
			}}
		/>
	)
}

export default ChaptersList
