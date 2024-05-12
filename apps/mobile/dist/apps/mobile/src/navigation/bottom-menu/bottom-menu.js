import MenuItem from '@/navigation/bottom-menu/menu-item';
import { View } from 'react-native';
import { menuItems } from './menu.list';
const BottomMenu = properties => (<View className='border-bordered bg-background w-full flex-row items-center justify-between overflow-hidden border-t-[1px]  px-4 pb-1 pt-2'>
		{menuItems.map(item => (<MenuItem key={item.path} item={item} {...properties}/>))}
	</View>);
export default BottomMenu;
//# sourceMappingURL=bottom-menu.js.map