import api from '@/api';
import { Button, Title } from '@/ui';
import { GenreElement } from '@/ui/genre-element/genre-element';
import { useQuery } from '@tanstack/react-query';
import { Color } from 'global/colors';
import { QueryKeys } from 'global/utils/query-keys';
import { View } from 'react-native';
const ManageRecommendationMenu = ({ onManagePress }) => {
    const { data: selectedGenres } = useQuery({
        queryKey: QueryKeys.recommendationGenres,
        queryFn: () => api.recommendation.currentRecommendation(),
        select: data => data.data
    });
    if (!selectedGenres)
        return null;
    return (<View className='bg-foreground border-bordered m-3 rounded border-[1px] p-3.5'>
			<Title size={'xxl'} color={Color.white} weight='bold'>
				Manage Recommendation
			</Title>
			<Title weight='light' className='mb-4' numberOfLines={2} size={'md'}>
				To get new recommendations, you need to adjust your goals
			</Title>
			<View className='mb-4 flex flex-row flex-wrap'>
				{selectedGenres.map(genre => (<GenreElement size='sm' className='mr-2' key={genre.slug} svgUri={genre.icon} title={genre.name}/>))}
			</View>

			<Button size={'md'} variant='primary' onPress={onManagePress}>
				Manage
			</Button>
		</View>);
};
export default ManageRecommendationMenu;
//# sourceMappingURL=manage-recommendation-menu.js.map