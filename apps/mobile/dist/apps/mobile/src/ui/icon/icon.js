import { cn } from '@/utils';
import { InnerColor } from 'global/colors';
import { Pressable } from 'react-native';
import { settings } from './settings';
const Icon = ({ icon: Icon, variant = 'foreground', size = 'sm', fatness = 2, stroke = InnerColor[variant], className = '', fill = false, noPadding = false, ...properties }) => (<Pressable className={cn('items-center justify-center rounded-lg', properties.disabled && 'opacity-50', noPadding ? 'p-0' : settings.padding[size], settings.colors[variant], className)} {...properties}>
		<Icon width={settings.size[size]} height={settings.size[size]} strokeWidth={fatness} fill={fill ? InnerColor[variant] : 'none'} stroke={stroke}/>
	</Pressable>);
export default Icon;
//# sourceMappingURL=icon.js.map