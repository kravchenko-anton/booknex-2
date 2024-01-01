import { PressableContainer } from '@/components'
import { settings } from '@/components/book-card/settings'
import Layout from '@/components/layout/layout'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSearch } from '@/screens/search/useSearch'
import { Close } from 'icons'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { twMerge } from 'tailwind-merge'
import { Color } from 'ui/colors'
import { Button, Image, Loader, Title } from 'ui/components'
import { fontSettings } from '../../../../../../libs/ui/react-native/title/settings'

const Search = () => {
	const { searchTerm, books, booksLoading, control, clearSearch } = useSearch()
	const { navigate, goBack } = useTypedNavigation()
	return (
		<Layout className='h-full p-0'>
			<Controller
				control={control}
				name='searchTerm'
				render={({ field: { value, onChange, onBlur } }) => (
					<View className='border-vibrant border-b-[1px]'>
						<View className=' w-full flex-row items-center justify-between px-2'>
							<View className='w-3/4 flex-row items-center'>
								<Close
									width={25}
									height={25}
									color={Color.white}
									onPress={() => goBack()}
								/>
								<TextInput
									autoCapitalize='none'
									onBlur={onBlur}
									className='ml-2 w-full'
									onChangeText={onChange}
									value={value}
									placeholderTextColor={Color.gray}
									placeholder='Type something to search'
									keyboardAppearance='dark'
									renderToHardwareTextureAndroid={true}
									style={{
										fontFamily: fontSettings.bold,
										color: Color.white
									}}
								/>
							</View>

							<Button
								onPress={() => clearSearch()}
								className={twMerge(!searchTerm && 'hidden')}
								text='Clear'
								variant='foreground'
								size='sm'
							/>
						</View>
					</View>
				)}
			/>

			{searchTerm ? (
				<View className='flex-1'>
					{booksLoading ? (
						<Loader />
					) : (
						<FlatList
							className='w-full px-2 pb-4 pt-2'
							numColumns={2}
							columnWrapperStyle={{
								justifyContent: 'space-between'
							}}
							data={books}
							renderItem={({ item: book }) => (
								<PressableContainer
									onPress={() => {
										navigate('Book', { id: book.id })
									}}
									className='mx-2 mb-4 w-[45%]'
								>
									<Image
										className='w-full'
										height={settings.height.md}
										url={book.picture}
									/>
									<Title color={Color.gray} weight='semiBold'>
										{book.author.name}
									</Title>
								</PressableContainer>
							)}
						/>
					)}
				</View>
			) : null}
		</Layout>
	)
}

export default Search
