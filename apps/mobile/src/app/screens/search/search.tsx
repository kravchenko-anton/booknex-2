import { AnimatedPress } from '@/components'
import { settings } from '@/components/book-card/settings'
import Layout from '@/components/layout/layout'
import { Button, Flatlist, Image, Loader, Title } from '@/components/ui'
import { fontSettings } from '@/components/ui/title/settings'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSearch } from '@/screens/search/useSearch'
import { Color } from 'global/colors'
import { NothingFound } from 'global/illustrations'
import { Close } from 'icons'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

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
									autoFocus={true}
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
								variant='foreground'
								size='sm'
							>
								Clear
							</Button>
						</View>
					</View>
				)}
			/>

			{searchTerm ? (
				<View className='flex-1'>
					{booksLoading ? (
						<Loader />
					) : books.length > 0 ? (
						<Flatlist
							mt={10}
							className='w-full px-2'
							numColumns={2}
							columnWrapperStyle={{
								justifyContent: 'space-between'
							}}
							data={books}
							renderItem={({ item: book }) => (
								<AnimatedPress
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
									<Title color={Color.gray} weight='medium'>
										{book.title}
									</Title>
									<Title color={Color.vibrant} size={16} weight='semiBold'>
										{book.author.name}
									</Title>
								</AnimatedPress>
							)}
						/>
					) : (
						<View className='flex-1 items-center justify-start'>
							<NothingFound width={250} height={220} />
							<Title
								center
								weight='medium'
								numberOfLines={2}
								color={Color.gray}
								size={16}
							>
								Nothing found, try looking
								{'\n'}
								for something else
							</Title>
						</View>
					)}
				</View>
			) : null}
		</Layout>
	)
}

export default Search
