import { Color } from 'global/colors';
import { ActivityIndicator, View } from 'react-native';
const Loader = ({ background = Color.background }) => (<View className='flex-1 items-center justify-center' style={{
        backgroundColor: background
    }}>
		<ActivityIndicator size='large' color={Color.primary} className='h-[80px] w-[80px]'/>
	</View>);
export default Loader;
//# sourceMappingURL=loader.js.map