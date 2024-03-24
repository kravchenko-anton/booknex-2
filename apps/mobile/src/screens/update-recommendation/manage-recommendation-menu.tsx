import api from '@/api';
import { Button, Title } from '@/ui';
import { useQuery } from '@tanstack/react-query';
import { Color } from 'global/colors';
import type { FunctionType } from 'global/types';
import type { FC } from 'react';
import { View } from 'react-native';

interface ManageRecommendationProperties {
  onManagePress: FunctionType;
}

const ManageRecommendationMenu: FC<ManageRecommendationProperties> = ({ onManagePress }) => {
  const { data: selectedGenres } = useQuery({
    queryKey: ['recommendation-genres'],
    queryFn: () => api.recommendation.currentRecommendation(),
    select: (data) => data.data
  });
  if (!selectedGenres) return null;
  return (
    <View className='bg-foreground border-bordered m-3 rounded-lg border-2 p-3.5'>
      <Title size={'xxl'} color={Color.white} weight='bold'>
        Manage Recommendation
      </Title>
      <Title weight='light' className='mb-4' numberOfLines={2} size={'md'}>
        To get new recommendations, you need to adjust your goals
      </Title>
      <View className='mb-4 flex flex-row flex-wrap gap-2'>
        {selectedGenres.map((genre) => (
          <Button key={genre.id} variant='muted' size='sm'>
            {genre.name}
          </Button>
        ))}
      </View>

      <Button size={'md'} variant='primary' onPress={onManagePress}>
        Manage
      </Button>
    </View>
  );
};

export default ManageRecommendationMenu;
