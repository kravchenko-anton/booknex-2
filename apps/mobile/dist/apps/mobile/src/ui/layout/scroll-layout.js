import { ScrollView } from '@/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
const ScrollLayout = ({ children, ...properties }) => (<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<ScrollView className='flex-1' {...properties}>
			{children}
		</ScrollView>
	</SafeAreaView>);
export default ScrollLayout;
//# sourceMappingURL=scroll-layout.js.map