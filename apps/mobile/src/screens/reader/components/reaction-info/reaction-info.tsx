import api from '@/api'
import type { ThemePackType } from '@/screens/reader/components/reader-customization/theme-pack'
import { Icon, Title } from '@/ui'
import { SvgButton } from '@/ui/svg-button/svg-button'
import { share } from '@/utils/share-function'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import * as Sentry from '@sentry/react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReactionByBookOutput, UpdateReaction } from 'global/api-client'
import { Color } from 'global/colors'
import { appName } from 'global/utils'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import { Share, Trash } from 'icons'
import React, { type FC, type RefObject } from 'react'
import { Pressable, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { reactions } from '../../../../../../backend/src/book/ebook/helpers/reactions'

export interface ReactionModalProperties {
	sheetRef: RefObject<BottomSheetModal>
	colorScheme: ThemePackType
	slug: string
	activeReactionPressed: ReactionByBookOutput | null
}
export const ReactionInfo: FC<ReactionModalProperties> = ({
	sheetRef,
	activeReactionPressed,
	colorScheme,
	slug
}) => {
	const queryClient = useQueryClient()
	const {
		mutateAsync: removeReactionMutation,
		isPending: removeReactionLoading
	} = useMutation({
		mutationKey: MutationKeys.reaction.remove,
		mutationFn: (id: string) => api.reaction.remove(id)
	})
	const removeReaction = (id: string) => {
		if (removeReactionLoading) return
		removeReactionMutation(id).then(async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.reaction.bySlug(slug)
			})
			sheetRef.current?.close()
		})
		Sentry.metrics.increment('remove-reaction')
	}

	const {
		mutateAsync: updateReactionMutation,
		isPending: updateReactionLoading
	} = useMutation({
		mutationKey: MutationKeys.reaction.update,
		mutationFn: (dto: UpdateReaction) => api.reaction.update(dto)
	})
	const updateReaction = (dto: UpdateReaction) => {
		if (updateReactionLoading) return
		updateReactionMutation(dto).then(async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.reaction.bySlug(slug)
			})
			sheetRef.current?.close()
		})
		Sentry.metrics.increment('update-reaction')
	}
	return (
		<BottomSheetModal
			enableContentPanningGesture
			enableHandlePanningGesture
			enablePanDownToClose
			enableOverDrag
			index={0}
			ref={sheetRef}
			snapPoints={[250]}
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
			<View className='mx-4'>
				<Title className=' ' size={'xxl'} weight='bold' numberOfLines={2}>
					{activeReactionPressed?.text}
				</Title>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={reactions}
					className='border-b-2 pb-1 pt-2'
					style={{
						borderColor: colorScheme.colorPalette.background.lighter
					}}
					renderItem={({ item }) => (
						<SvgButton
							className='mb-1.5 mr-2 mt-2 px-3'
							altEmoji={item.altEmoji}
							title={item.title}
							svgUri={item.svg}
							size='sm'
							variant={
								activeReactionPressed?.type === item.title
									? 'muted'
									: 'foreground'
							}
							onPress={
								activeReactionPressed?.type === item.title
									? undefined
									: () => {
											if (!activeReactionPressed) return
											console.log({
												id: activeReactionPressed.id,
												dto: {
													type: item.title
												}
											})
											updateReaction({
												id: activeReactionPressed.id,
												type: item.title
											})
										}
							}
						/>
					)}
				/>
				<View className='mt-2'>
					<Pressable
						className='flex-row items-center gap-2'
						onPress={() => {
							share(
								`hey, check out this reaction ${activeReactionPressed?.text} on ${appName}`
							)
						}}>
						<Icon
							icon={Share}
							size={'sm'}
							stroke={Color.gray}
							variant='transparent'
						/>
						<Title size='md' weight='medium' color={Color.white}>
							Share
						</Title>
					</Pressable>
					<Pressable
						disabled={removeReactionLoading || !activeReactionPressed}
						className='flex-row items-center gap-2'
						style={{
							opacity: removeReactionLoading || !activeReactionPressed ? 0.5 : 1
						}}
						onPress={() => {
							if (removeReactionLoading || !activeReactionPressed) return
							removeReaction(activeReactionPressed.id)
						}}>
						<Icon
							icon={Trash}
							size={'sm'}
							stroke={Color.gray}
							variant='transparent'
						/>
						<Title size='md' weight='medium' color={Color.white}>
							Delete
						</Title>
					</Pressable>
				</View>
			</View>
		</BottomSheetModal>
	)
}
