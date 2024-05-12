import { useTypedNavigation } from '@/hooks';
import BaseButton from '@/ui/button/button';
import { cn } from '@/utils';
import { Color } from 'global/colors';
import { appName } from 'global/utils';
import { ArrowLeft } from 'icons';
import { Pressable, View } from 'react-native';
import { Title } from '../../ui';
export const Head = ({ children, className, ...properties }) => (<View className={cn('bg-background  border-bordered z-50 w-full flex-row items-center justify-between border-b-[1px]', className)} {...properties}>
		{children}
	</View>);
export const BackButton = ({ className, ...properties }) => {
    const { goBack } = useTypedNavigation();
    return (<Pressable className={cn('py-2', className)} onPress={goBack} {...properties}>
			<ArrowLeft width={26} height={26} color={Color.white}/>
		</Pressable>);
};
export const BackWithTitle = ({ title }) => (<View className='flex-row items-center'>
		<BackButton className='px-3'/>
		<Title className='py-2' size={'xl'} weight='bold' color={Color.white}>
			{title}
		</Title>
	</View>);
export const Logo = ({ className, ...properties }) => (<Title size={'xxl'} weight='bold' className={cn('py-2', className)} color={Color.white} {...properties}>
		{appName}
	</Title>);
export const Button = ({ onPress, variant = 'foreground', children }) => (<BaseButton size='sm' variant={variant} className='my-2 mr-2 py-1.5' onPress={onPress}>
		{children}
	</BaseButton>);
export const Icon = ({ icon: Icon, className, ...properties }) => (<Pressable className={cn('py-2 ', className)} {...properties}>
		<Icon width={26} height={26} color={Color.white}/>
	</Pressable>);
export default { Head, Logo, BackWithTitle, Icon };
//# sourceMappingURL=header.js.map