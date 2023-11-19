import HeaderScrollLayout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { useSettingsList } from '@/screens/profile/settings/useSettingsList'
import type { IconType } from '@/types/global'
import { Color } from '@/utils/color'
import { VERSION } from '@env'
import { Pressable, View } from 'react-native'
// TODO: сделать страницу настройки когда уже многое будет готово
const Settings = () => {
	const settingsList = useSettingsList()
	return (
		<HeaderScrollLayout
			animatedHeader={{
				transientValue: 80,
				title: 'Settings'
			}}
			className='px-2'>
			<Title size={32} weight={'bold'}>
				Settings
			</Title>

			{settingsList.map(item => (
				<View key={item.title} className='mt-4 w-full rounded-xl bg-dust p-4'>
					<Title size={26} weight={'bold'} className='mb-2'>
						{item.title}
					</Title>
					{item.list.map(listItem => (
						<Pressable
							key={listItem.title}
							onPress={() => listItem.onPress()}
							className='flex-row items-center justify-between'>
							<View className='flex-row items-center'>
								<Icon
									size={'small'}
									name={listItem.icon as IconType}
									noPadding
									className='mr-2'
									color={Color.secondary}
								/>
								<Title size={18} weight={'bold'} color={Color.secondary}>
									{listItem.title}
								</Title>
							</View>
							<Icon
								size={'small'}
								color={Color.secondary}
								name='chevron-right'
							/>
						</Pressable>
					))}
				</View>
			))}

			<View className='mb-2 mt-4 w-full rounded-xl bg-dust p-4'>
				<Title size={26} weight={'bold'} className='mb-2'>
					About the application
				</Title>
				<Title size={18} weight={'bold'} color={Color.secondary}>
					Version: {VERSION}
				</Title>
			</View>
		</HeaderScrollLayout>
	)
}
export default Settings
