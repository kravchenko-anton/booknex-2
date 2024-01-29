import type { DefaultBottomSheetProperties } from '@/features/reader/types'
import { useTypedSelector } from '@/shared/hooks'
import { Title } from '@/shared/ui'
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetSectionList
} from '@gorhom/bottom-sheet'
import type { ChaptersType } from 'global/services-types/book-types'
import type { FC } from 'react'
import React, { useMemo } from 'react'
import { Pressable } from 'react-native'

const ChaptersList: FC<
	{
		chapters: ChaptersType
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
						title: child.title,
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
							numberOfLines={2}
							className='  mt-[-1px] border-b-[1px] p-4'
							size={22}
							color={colorScheme.colorPalette.text}
							style={{
								borderColor: colorScheme.colorPalette.background.lighter,
								backgroundColor: colorScheme.colorPalette.background.darker
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
								console.log(item.link)
								openChapter(item.link)
							}}
							style={{
								backgroundColor: colorScheme.colorPalette.background.lighter,
								borderColor: colorScheme.colorPalette.background.normal
							}}
							className=' w-full border-b-[1px] p-4'
						>
							<Title
								numberOfLines={2}
								size={18}
								weight='semiBold'
								style={{
									color: colorScheme.colorPalette.text
								}}
							>
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
