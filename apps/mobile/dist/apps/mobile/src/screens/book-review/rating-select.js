import { Title } from '@/ui';
import { Color } from 'global/colors';
import { Star } from 'icons';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
export const RatingSelect = ({ control, name }) => (<Controller control={control} name={name} render={({ field: { value = 0, onChange: setRating }, fieldState: { error } }) => (<>
				<View className='w-full items-center justify-center pt-4'>
					<View className=' flex-row items-center gap-5'>
						{[1, 2, 3, 4, 5].map(star => (<Star width={35} height={35} key={star} stroke={Color.warning} fill={star <= value ? Color.warning : Color.transparent} onPress={() => setRating(star)}/>))}
					</View>
				</View>

				{error ? (<Title color={Color.danger} size={'md'}>
						{error.message ?? 'error!'}
					</Title>) : null}
			</>)}/>);
//# sourceMappingURL=rating-select.js.map