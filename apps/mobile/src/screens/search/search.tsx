import { useTypedNavigation } from '@/hooks'
import { useSearch } from '@/screens/search/useSearch'
import { Button, Layout, Loader, Title } from '@/ui'
import CatalogList from '@/ui/book-lists/catalog-list'
import { fontSettings } from '@/ui/title/settings'
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
					<View className='border-muted border-b-[1px]'>
						<View className=' w-full flex-row items-center justify-between px-2'>
							<View className='w-3/4 flex-row items-center'>
								<Close
									width={25}
									height={25}
									color={Color.white}
									onPress={() => goBack()}
								/>
								<TextInput
									autoFocus
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
								className={twMerge(!searchTerm && 'hidden')}
								variant='foreground'
								size='sm'
								onPress={() => clearSearch()}
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
					) : books && books.length >= 2 ? (
						<CatalogList
							data={books}
							onElementPress={id => navigate('Book', { id })}
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
