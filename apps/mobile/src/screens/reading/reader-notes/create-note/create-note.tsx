import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { reactions, type reactionsTitles } from '@/screens/reading/reactions'
import { useCustomizationStore } from '@/screens/reading/store/customization-store'
import { useReactionsStore } from '@/screens/reading/store/reader-store'
import { Field, Flatlist, Title } from '@/ui'
import { SvgButton } from '@/ui/svg-button/svg-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Color } from 'global/colors'
import { ArrowLeft, Check } from 'icons'
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import type { FlatList } from 'react-native-gesture-handler'
import { z } from 'zod'

export interface CreateNoteFormType {
	slug: string
	range: {
		start: number
		end: number
		endXPath: string
		startXPath: string
	}
	reaction: reactionsTitles
	selectedText?: string
	userFeelings?: string
}

export const validation = z.object({
	slug: z.string(),
	range: z.object({
		start: z.number(),
		end: z.number(),
		endXPath: z.string(),
		startXPath: z.string()
	}),
	reaction: z.string(),
	selectedText: z.string().optional(),
	userFeelings: z.string().optional()
})

const CreateNote = () => {
	const { params } = useTypedRoute<'CreateNote'>()
	const { goBack } = useTypedNavigation()
	const { colorPalette } = useCustomizationStore(state => state.colorScheme)
	const newReaction = useReactionsStore(state => state.newReaction)
	console.log(params.range, 'params')
	const { control, reset, handleSubmit } = useForm<CreateNoteFormType>({
		resolver: zodResolver(validation)
	})
	useEffect(() => {
		reset({
			slug: params.slug,
			reaction: params.reaction,
			selectedText: params.text,
			range: params.range
		})
	}, [reset])

	const onSubmit = handleSubmit(data => {
		console.log(data, 'данные с формы')
		newReaction({
			//TODO: переделать и сделать нормальный id
			id: Math.random().toString() + Date.now().toString(),
			createAt: new Date(),
			bookSlug: data.slug,
			reaction: data.reaction,
			range: {
				startXPath: data.range.startXPath,
				endXPath: data.range.endXPath,
				endOffset: data.range.end,
				startOffset: data.range.start
			},
			text: data.selectedText || ''
		})
		goBack()
	})
	const reference = useRef<FlatList>(null)
	useEffect(() => {
		const activeReactionIndex = reactions.findIndex(
			reaction => reaction.title === params.reaction
		)
		if (activeReactionIndex !== -1) {
			reference.current?.scrollToIndex({
				index: activeReactionIndex,
				animated: true
			})
		}
	}, [reference])
	return (
		<View className='bg-background h-full justify-between'>
			<View>
				<View className='mt-0 w-full flex-row items-center justify-between px-4 pb-2.5 pt-2.5'>
					<View className=' flex-row items-center'>
						<ArrowLeft
							width={28}
							height={28}
							color={colorPalette.text}
							onPress={() => goBack()}
						/>
					</View>
					<View className='flex-row items-center gap-6'>
						<Check
							width={28}
							height={28}
							color={colorPalette.text}
							onPress={onSubmit}
						/>
					</View>
				</View>
				<Title
					size='xl'
					weight='regular'
					numberOfLines={12}
					className='mx-2 pl-2'
					style={{
						borderLeftColor: colorPalette.primary,
						borderLeftWidth: 2
					}}>
					{params.text}
				</Title>
				<Field
					multiline
					editable
					control={control}
					name='userFeelings'
					variant='background'
					className=' mt-2 h-40'
					placeholder='Write something about your feelings...'
					numberOfLines={10_000}
					placeholderTextColor={Color.gray}
					textAlignVertical='top'
				/>
			</View>
			<View className=' border-bordered mb-5 border-t-2 py-3'>
				<Controller
					control={control}
					name={'reaction'}
					render={({
						field: { value = '', onChange: setReaction },
						fieldState: { error }
					}) => (
						<>
							<Flatlist
								horizontal
								mt={0}
								data={reactions}
								renderItem={({ item }) => (
									<SvgButton
										altEmoji={item.altEmoji}
										title={item.title}
										svgUri={item.svg}
										size='md'
										variant={value === item.title ? 'primary' : 'muted'}
										onPress={() => setReaction(item.title)}
									/>
								)}
								onScrollToIndexFailed={info => {
									const wait = new Promise(resolve => setTimeout(resolve, 500))
									wait.then(() => {
										reference.current?.scrollToIndex({
											index: info.index,
											animated: true,
											viewPosition: 0.5
										})
									})
								}}
							/>
							{!!error && (
								<Title className='text-danger mt-0.5 text-xs italic'>
									{error.message}
								</Title>
							)}
						</>
					)}
				/>
			</View>
		</View>
	)
}

export default CreateNote
