import { Title } from '@/ui';
import { cn } from '@/utils';
import { Color } from 'global/colors';
import { ChevronRight } from 'icons';
import { Pressable, View } from 'react-native';
export const Item = ({ title, description, className = '', onPress, bordered, ...properties }) => (<Pressable key={title} className={cn('mx-2 flex-row items-center justify-between py-3', bordered && 'border-bordered border-b-2 pb-3', className)} onPress={onPress} {...properties}>
		<View className='flex-row items-center justify-center'>
			<View>
				<Title size='md' weight='semiBold' color={Color.white}>
					{title}
				</Title>
				{description ? (<Title size='sm' weight='light' color={Color.gray}>
						{description}
					</Title>) : null}
			</View>
		</View>
		<ChevronRight width={25} height={25} color='#F0E8E6'/>
	</Pressable>);
//# sourceMappingURL=settings-list.js.map