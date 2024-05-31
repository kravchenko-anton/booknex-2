import { useTypedNavigation } from '@/hooks'
import { reactions } from '@/screens/reading/reactions'
import { useReactionsStore } from '@/screens/reading/store/reader-store'
import type { SearchFormDataType } from '@/screens/search/useSearchForm'
import { Button, Flatlist, Title } from '@/ui'
import { SvgButton } from '@/ui/svg-button/svg-button'
import { fontSettings } from '@/ui/title/settings'
import { cn } from '@/utils'
import { share } from '@/utils/share-function'
import { Color } from 'global/colors'
import { timeAgo } from 'global/utils'
import { Close } from 'icons'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'
//TODO: сделать edit, добавление и синхронизацию
const ReaderNotes = () => {
	const { removeReaction, userReactions } = useReactionsStore(state => ({
		userReactions: state.reactions,
		removeReaction: state.removeReaction
	}))
	const [filterSettings, setFilterSettings] = React.useState({
		search: '',
		reaction: ''
	})
	const { control, watch, reset } = useForm<SearchFormDataType>({
		mode: 'onChange',
		defaultValues: {
			searchTerm: ''
		}
	})

	const clearSearch = () => reset({ searchTerm: '' })

	const searchTerm = watch('searchTerm')
	const { goBack } = useTypedNavigation()
	return (
		<View className='bg-background h-screen w-screen'>
			<Controller
				control={control}
				name='searchTerm'
				render={({ field: { value, onChange, onBlur } }) => (
					<View className='border-bordered border-b-[1px]'>
						<View className=' w-full flex-row items-center justify-between px-2'>
							<View className='w-3/4 flex-row items-center'>
								<Close
									width={25}
									height={25}
									color={Color.white}
									onPress={goBack}
								/>
								<TextInput
									renderToHardwareTextureAndroid
									autoCapitalize='none'
									className='ml-2 w-full'
									value={value}
									placeholderTextColor={Color.gray}
									placeholder='Type something to search'
									keyboardAppearance='dark'
									style={{
										fontFamily: fontSettings.bold,
										color: Color.white
									}}
									onBlur={onBlur}
									onChangeText={onChange}
								/>
							</View>

							<Button
								className={cn(!searchTerm && 'hidden')}
								variant='foreground'
								size='sm'
								onPress={() => clearSearch()}>
								Clear
							</Button>
						</View>
					</View>
				)}
			/>
			<View className='pt-2'>
				<Flatlist
					horizontal
					mt={0}
					data={[
						{
							title: 'all',
							alt: 'all',
							svg: '',
							altEmoji: ''
						},
						...reactions
					]}
					renderItem={({ item }) => {
						if (item.title === 'all') {
							return (
								<Button
									size='sm'
									className='px-3'
									variant={
										filterSettings.reaction === '' ? 'muted' : 'foreground'
									}
									onPress={() =>
										setFilterSettings({
											...filterSettings,
											reaction: ''
										})
									}>
									All
								</Button>
							)
						}
						return (
							<SvgButton
								className='px-3'
								altEmoji={item.altEmoji}
								title={item.title}
								svgUri={item.svg}
								size='sm'
								variant={
									filterSettings.reaction === item.title
										? 'muted'
										: 'foreground'
								}
								onPress={() =>
									setFilterSettings({
										...filterSettings,
										reaction: item.title
									})
								}
							/>
						)
					}}
				/>
			</View>
			<Flatlist
				mt={2}
				ListEmptyComponent={() => (
					<Title
						className='mx-auto'
						size={'md'}
						color={Color.gray}
						weight='medium'>
						It's quiet, too quiet
					</Title>
				)}
				data={userReactions.filter(
					note =>
						note.text.includes(searchTerm) &&
						(filterSettings.reaction === '' ||
							note.reaction === filterSettings.reaction)
				)}
				renderItem={({ item }) => (
					<View className='border-bordered mx-2 border-b-[1px] py-2'>
						<Title numberOfLines={100} className=''>
							{item.text}
						</Title>
						<View className='flex-row items-center justify-between'>
							<Title size='sm' numberOfLines={1} color={Color.gray}>
								{timeAgo(new Date(item.createAt))} ago
							</Title>
							<View className='mt-2 flex-row items-center'>
								<Button
									size={'sm'}
									variant='foreground'
									className='mr-2'
									onPress={() => {
										share(item.text)
									}}>
									Share
								</Button>
								<Button
									size={'sm'}
									variant='foreground'
									onPress={() => {
										removeReaction(item.id)
									}}>
									Delete
								</Button>
							</View>
						</View>
					</View>
				)}
			/>
		</View>
	)
}
export default ReaderNotes
