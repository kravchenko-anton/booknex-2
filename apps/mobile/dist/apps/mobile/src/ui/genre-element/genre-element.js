import { storage } from '@/App';
import { AnimatedPress } from '@/ui';
import { settings } from '@/ui/button/settings';
import { useGenreSvgContent } from '@/ui/genre-element/useGenreSvgContent';
import Title from '@/ui/title/title';
import { cn } from '@/utils';
import { InnerColor } from 'global/colors';
import { SvgXml } from 'react-native-svg';
export const GenreElement = ({ svgUri, title, size = 'md', variant = 'muted', ...rest }) => {
    const svgContent = useGenreSvgContent(svgUri);
    return (<AnimatedPress className={cn('flex-row items-center justify-center rounded-lg', settings.padding[size], settings.colors[variant])} {...rest}>
			<Title weight='semiBold' color={InnerColor[variant]} size={settings.titleSize[size]}>
				{title}
			</Title>
			{/*/
    TODO: закешировать
    /*/}

			<SvgXml xml={svgContent} className='ml-2 mt-0.5' width={settings.iconSize[size]} height={settings.iconSize[size]} onError={() => storage.delete('svgGenre' + svgUri)}/>
		</AnimatedPress>);
};
//# sourceMappingURL=genre-element.js.map