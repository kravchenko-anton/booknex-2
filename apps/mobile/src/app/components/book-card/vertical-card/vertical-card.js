import { heightSettings, widthSettings } from '@/components/book-card/vertical-card/vertical-card-settings'
import PressableContainer from '@/components/pressable-container/pressable-container'
import Image from '@/components/ui/image/image'
import Title from '@/components/ui/title/title'
import { View } from 'react-native'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { Color } from 'ui/colors'

const VerticalCard = ({ ...card }) => (_jsxs(PressableContainer, {
	style: {
		height: heightSettings[card.image.size]
	}, className: 'bg-dust mb-1.5 w-full flex-row rounded-lg p-2', ...card, children: [_jsx(Image, { url: card.image.uri, height: heightSettings[card.image.size], fullSize: true, width: widthSettings[card.image.size] }), _jsxs(View, {
		className: 'flex-1 pb-0 pl-3', children: [_jsxs(View, { children: [_jsx(Title, { size: 22, weight: 'bold', numberOfLines: 2, children: card.title }), _jsx(Title, { size: 16, weight: 'light', numberOfLines: card.descriptionLines, className: 'mb-2 mt-1', color: Color.gray, children: card.description })] }), card.buttons && (_jsx(View, {
			className: 'flex-row flex-wrap items-center gap-2', children: card.buttons.map(({ label, backgroundColor = Color.shade, color = Color.black, ...properties }) => (_jsx(Title, {
				size: 16, className: 'rounded-xl p-2', weight: 'medium', style: {
					backgroundColor: backgroundColor,
					color: color
				}, ...properties, children: label
			}, label)))
		}))]
	})]
}))
export default VerticalCard
//# sourceMappingURL=vertical-card.js.map
