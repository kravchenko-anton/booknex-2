import { AnimatedPress, Flatlist, Image, Title } from '@/ui';
import { Color } from 'global/colors';
import { Dimensions } from 'react-native';
const CatalogList = ({ data, disabledScroll = false, onElementPress = () => null }) => {
    const isBigScreen = Dimensions.get('window').width > 500;
    return (<Flatlist scrollEnabled={!disabledScroll} mt={10} className='w-full px-4' data={data} numColumns={isBigScreen ? 3 : 2} ListEmptyComponent={() => (<Title className='mx-auto' size={'md'} color={Color.gray} weight='medium'>
					It's quiet, too quiet
				</Title>)} columnWrapperStyle={{
            justifyContent: 'space-between'
        }} renderItem={({ item: book }) => (<AnimatedPress className='mb-4' style={{
                width: isBigScreen ? '30%' : '48%'
            }} onPress={() => onElementPress(book.slug)}>
					<Image className='mb-1 w-full' url={book.picture} height={isBigScreen
                ? Dimensions.get('window').width / 2.3
                : Dimensions.get('window').width / 1.5}/>
					<Title color={Color.gray} size={'md'} numberOfLines={2} weight='semiBold'>
						{book.title}
					</Title>
				</AnimatedPress>)}/>);
};
export default CatalogList;
//# sourceMappingURL=catalog-list.js.map