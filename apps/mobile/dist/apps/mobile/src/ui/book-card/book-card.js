import { Image, Title } from '@/ui';
import AnimatedPress from '@/ui/animated-press/animated-press';
import { settings } from '@/ui/book-card/settings';
import { Color } from 'global/colors';
const BookCard = ({ image, size = 'md', style, ...properties }) => (<AnimatedPress style={[
        {
            width: settings.width[size]
        },
        style
    ]} {...properties}>
		<Image url={image.uri} borderRadius={12} className=' mb-2' height={settings.height[size]} width={settings.width[size]}/>
		<Title numberOfLines={2} color={Color.white} weight='medium' size={'md'}>
			{properties.title}
		</Title>

		<Title numberOfLines={1} weight='regular' size={'sm'} color={Color.gray}>
			{properties.author}
		</Title>
	</AnimatedPress>);
export default BookCard;
//# sourceMappingURL=book-card.js.map