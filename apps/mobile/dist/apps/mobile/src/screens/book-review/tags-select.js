import { Button, Title } from '@/ui';
import { Color } from 'global/colors';
import { reviewTags } from 'global/utils/review-tags';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
export const mappedTags = (tags, selectedTags, setSelectedTags) => tags.map(tag => (<Button size='sm' key={tag.id} variant={selectedTags.includes(tag.name) ? 'primary' : 'muted'} onPress={() => {
        if (selectedTags.includes(tag.name)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag.name));
        }
        else {
            setSelectedTags([...selectedTags, tag.name]);
        }
    }}>
			{tag.name}
		</Button>));
export const TagsSelect = ({ control, name, currentRating }) => (<Controller control={control} name={name} render={({ field: { value = [], onChange: setTags }, fieldState: { error } }) => (<>
				<View className='mb-2 w-full flex-row flex-wrap items-center justify-center gap-2 pt-4'>
					{mappedTags(currentRating > 3 ? reviewTags.positive : reviewTags.negative, value, setTags)}
				</View>

				{error ? (<Title color={Color.danger} size={'md'}>
						{error.message ?? 'error!'}
					</Title>) : null}
			</>)}/>);
//# sourceMappingURL=tags-select.js.map