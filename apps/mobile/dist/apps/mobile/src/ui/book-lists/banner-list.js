import { Flatlist, Title } from '@/ui';
import { Color } from 'global/colors';
import { View } from 'react-native';
const BannerList = ({ title, data = [], style, ...properties }) => {
    if (!data?.length)
        return null;
    return (<View style={style} className='bg-foreground border-bordered mb-0 ml-2 mt-4 rounded-lg rounded-r-none border-[1px] border-r-0  p-3 px-0'>
			<View className='pl-4'>
				<Title weight='bold' color={Color.white} onPress={() => {
            throw new Error('Check the error.');
        }}>
					{title}
				</Title>
				<Title weight='regular' className='mb-4' size={'sm'} color={Color.gray}>
					{data.length.toString()} books
				</Title>
			</View>
			<Flatlist horizontal px={16} mt={0} data={data} {...properties}/>
		</View>);
};
export default BannerList;
//# sourceMappingURL=banner-list.js.map