import type { ThemePackType } from '@/screens/reader/feature/modals/reader-customization/theme-pack'
import type { ReadingProgressType } from '@/screens/reader/feature/reading-progress/useReadingProgress'
import { Title } from '@/ui'
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetSectionList,
	type BottomSheetSectionListMethods
} from '@gorhom/bottom-sheet'
import type { EbookOutputChaptersInner } from 'global/api-client'
import { useMemo, useRef, type FC, type RefObject } from 'react'
import { Pressable } from 'react-native'

export interface ReaderChaptersProperties {
	sheetRef: RefObject<BottomSheetModal>
	chapters: EbookOutputChaptersInner[]
	changeChapter: (link: string) => void
	colorScheme: ThemePackType
	activeChapter: ReadingProgressType['chapter']
}

//TODO: сделать нормальное отображение главы которую щас читаешь в списке

const ReaderChapters: FC<ReaderChaptersProperties> = ({
	sheetRef,
	chapters,
	changeChapter,
	colorScheme,
	activeChapter
}) => {
	const sections = useMemo(
		() =>
			chapters.map(chapter => ({
				title: chapter.title,
				data: chapter.children
			})),
		[chapters]
	)

	const bottomSheetSectionListReference =
		useRef<BottomSheetSectionListMethods>(null)

	return (
		<BottomSheetModal
			enableContentPanningGesture
			enableHandlePanningGesture
			enablePanDownToClose
			enableOverDrag
			index={0}
			ref={sheetRef}
			snapPoints={['40%', '80%']}
			handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
			backgroundStyle={{
				backgroundColor: colorScheme.colorPalette.background.darker
			}}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop
					disappearsOnIndex={-1}
					appearsOnIndex={0}
					{...backdropProperties}
					enableTouchThrough
				/>
			)}>
			<BottomSheetSectionList
				stickySectionHeadersEnabled
				scrollToOverflowEnabled
				nestedScrollEnabled
				sections={sections}
				ref={bottomSheetSectionListReference}
				showsVerticalScrollIndicator={false}
				className='mt-2 h-full px-4'
				style={{
					backgroundColor: colorScheme.colorPalette.background.darker
				}}
				renderSectionHeader={({ section }) => (
					<Title
						weight='bold'
						numberOfLines={2}
						className='mt-[-1px] border-b-[1px] p-4'
						size={'xxl'}
						color={colorScheme.colorPalette.text}
						style={{
							borderColor: colorScheme.colorPalette.background.lighter,
							backgroundColor: colorScheme.colorPalette.background.darker
						}}>
						{section.title}
					</Title>
				)}
				renderItem={({ item: chapter }) => (
					<Pressable
						className='w-full flex-row items-center justify-between border-b-[1px] p-4'
						style={{
							backgroundColor:
								activeChapter?.link === chapter.link
									? colorScheme.colorPalette.background.normal
									: colorScheme.colorPalette.background.lighter,
							borderColor: colorScheme.colorPalette.background.normal
						}}
						onPress={() => {
							console.log(chapter.link)
							changeChapter(chapter.link)
						}}>
						<Title
							numberOfLines={2}
							size={'lg'}
							weight='semiBold'
							style={{
								color: colorScheme.colorPalette.text
							}}>
							{chapter.name}
						</Title>
						{chapter.link === activeChapter?.link && (
							<Title
								numberOfLines={2}
								size={'lg'}
								weight='semiBold'
								style={{
									color: colorScheme.colorPalette.text
								}}>
								{Number(activeChapter?.progress || 0).toFixed(1) + '%'}
							</Title>
						)}
					</Pressable>
				)}
			/>
		</BottomSheetModal>
	)
}

export default ReaderChapters
