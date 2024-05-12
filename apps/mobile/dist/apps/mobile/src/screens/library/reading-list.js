import { Image, Title } from '@/ui';
import { settings } from '@/ui/book-card/settings';
import ProgressBar from '@/ui/progress-bar/progress-bar';
import { useNetInfo } from '@react-native-community/netinfo';
import { Color } from 'global/colors';
import { View } from 'react-native';
import Animated, { JumpingTransition } from 'react-native-reanimated';
export const ReadingList = ({ data, history, navigate }) => {
    const { isConnected } = useNetInfo();
    return (<View className='bg-foreground border-bordered mb-0 ml-2 mt-4 rounded-md rounded-r-none border-[1px] border-r-0  p-3 px-0'>
			<View className='pl-4'>
				<Title weight='bold' color={Color.white} onPress={() => {
            throw new Error('Check the error.');
        }}>
					Reading now
				</Title>
				<Title weight='regular' className='mb-4' size={'sm'} color={Color.gray}>
					{data.length.toString()} books
				</Title>
			</View>
			<Animated.FlatList horizontal showsHorizontalScrollIndicator={false} layout={JumpingTransition} bounces={false} alwaysBounceHorizontal={false} ItemSeparatorComponent={() => <View style={{ width: 12 }}/>} 
    //TODO: сделать тут сортировку если нету интернета исходя из истории
    data={isConnected
            ? data
            : data.sort((a, b) => {
                if (history.some(h => h.bookSlug === a.slug) &&
                    history.some(h => h.bookSlug === b.slug)) {
                    return ((history.find(h => h.bookSlug === a.slug)?.endProgress ||
                        0) -
                        (history.find(h => h.bookSlug === b.slug)?.endProgress || 0));
                }
                if (history.some(h => h.bookSlug === a.slug))
                    return -1;
                if (history.some(h => h.bookSlug === b.slug))
                    return 1;
                return 0;
            })} contentContainerStyle={{
            paddingHorizontal: 12,
            paddingBottom: 8
        }} renderItem={({ item: book }) => {
            const progress = history.some(b => b.bookSlug === book.slug)
                ? (history.find(b => b.bookSlug === book.slug)?.endProgress || 0) /
                    100
                : (book.readingHistory?.progress || 0) / 100;
            const scrollPosition = history.some(b => b.bookSlug === book.slug)
                ? history.find(b => b.bookSlug === book.slug)?.scrollPosition || 0
                : book.readingHistory?.scrollPosition;
            return (<Animated.View style={{
                    width: settings.width.md
                }} onTouchEnd={() => {
                    navigate('Reader', {
                        slug: book.slug,
                        initialScrollPosition: scrollPosition || 0
                    });
                }}>
							<Image width={settings.width.md} height={settings.height.md} url={book.picture} className='mb-2'/>
							<ProgressBar progress={progress}/>
							<Title numberOfLines={2} size='md' weight='medium' className='mt-1'>
								{book.title}
							</Title>
						</Animated.View>);
        }}/>
		</View>);
};
//# sourceMappingURL=reading-list.js.map