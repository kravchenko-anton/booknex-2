import { useReader } from '@/screens/reading/reader-context'
import { Title } from '@/ui'
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetSectionList
} from '@gorhom/bottom-sheet'
import type { OutputChapter } from 'global/api-client'
import type { FC } from 'react'
import { useMemo } from 'react'
import { Pressable } from 'react-native'

interface ReaderChaptersProperties {
	sheetRef: React.RefObject<BottomSheetModal>
	chapters: OutputChapter[]
}

const ReaderChapters: FC<ReaderChaptersProperties> = ({
	sheetRef,
	chapters
}) => {
	const { colorScheme, changeChapter } = useReader()
	const sections = useMemo(
		() =>
			chapters.map(chapter => ({
				title: chapter.title,
				data: chapter.children
			})),
		[chapters]
	)

	return (
		<BottomSheetModal
			enableContentPanningGesture
			enableHandlePanningGesture
			enablePanDownToClose
			enableOverDrag
			ref={sheetRef}
			snapPoints={['40%', '50%']}
			handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
			backgroundStyle={{
				backgroundColor: colorScheme.colorPalette.background.darker
			}}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop {...backdropProperties} enableTouchThrough />
			)}
		>
			<BottomSheetSectionList
				stickySectionHeadersEnabled
				scrollToOverflowEnabled
				sections={sections}
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
						}}
					>
						{section.title}
					</Title>
				)}
				renderItem={({ item: chapter }) => (
					<Pressable
						className=' w-full border-b-[1px] p-4'
						style={{
							backgroundColor: colorScheme.colorPalette.background.lighter,
							borderColor: colorScheme.colorPalette.background.normal
						}}
						onPress={() => {
							console.log(chapter.link)
							changeChapter(chapter.link)
						}}
					>
						<Title
							numberOfLines={2}
							size={'lg'}
							weight='semiBold'
							style={{
								color: colorScheme.colorPalette.text
							}}
						>
							{chapter.name}
						</Title>
					</Pressable>
				)}
			/>
		</BottomSheetModal>
	)
}

export default ReaderChapters
