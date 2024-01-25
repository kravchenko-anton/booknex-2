import type { DefaultBottomSheetProperties } from '@/features/reader/types'
import { useTypedSelector } from '@/shared/hooks'
import { Title } from '@/shared/ui'
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetSectionList
} from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import type { FC } from 'react'
import React, { useMemo } from 'react'
import { Pressable } from 'react-native'
import type { ChapterType } from '../../../../../../backend/types'

const ChaptersList: FC<
	{
		chapters: ChapterType[]
		openChapter: (chapterId: string) => void
	} & DefaultBottomSheetProperties
> = ({ chapters, close, openChapter }) => {
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
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
		<BottomSheet
			snapPoints={['40%', '50%']}
			enableContentPanningGesture={true}
			enableHandlePanningGesture={true}
			enablePanDownToClose={true}
			enableOverDrag={true}
			backgroundStyle={{
				backgroundColor: colorScheme.colorPalette.background.darker
			}}
			handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop
					onPress={close}
					{...backdropProperties}
					enableTouchThrough={true}
				/>
			)}
		>
			<BottomSheetSectionList
				stickySectionHeadersEnabled
				scrollToOverflowEnabled={true}
				sections={sections}
				showsVerticalScrollIndicator={false}
				className='mt-2 h-full px-4'
				style={{
					backgroundColor: colorScheme.colorPalette.background.darker
				}}
				renderSectionHeader={({ section }) => {
					return (
						<Title
							weight='bold'
							className='bg-foreground border-muted mt-[-1px] border-b-[1px] p-4'
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
							className='bg-muted border-muted w-full border-b-[1px] p-4'
						>
							<Title size={18} weight='semiBold'>
								{item.title}
							</Title>
						</Pressable>
					)
				}}
			/>
		</BottomSheet>
	)
}

export default ChaptersList
