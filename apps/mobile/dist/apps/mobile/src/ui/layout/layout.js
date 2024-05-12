import { cn } from '@/utils';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Layout = ({ children, className, ...properties }) => (<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<View className={cn('flex-1 p-2', className)} {...properties}>
			{children}
		</View>
	</SafeAreaView>);
export default Layout;
//# sourceMappingURL=layout.js.map