import { getFileUrl } from 'global/api-config'

export const reactions = [
	{
		title: 'angry' as const,
		alt: 'angry',
		gif: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Face%20With%20Symbols%20On%20Mouth.webp',
		altEmoji: '😠',
		svg: getFileUrl('icons/genre/angry.svg')
	},
	{
		title: 'smile' as const,
		alt: 'smile',
		gif: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Grinning%20Face%20With%20Smiling%20Eyes.webp',
		altEmoji: '😊',
		svg: getFileUrl('icons/genre/smile.svg')
	},
	{
		title: 'cry' as const,
		alt: 'cry',
		gif: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Loudly%20Crying%20Face.webp',
		altEmoji: '😢',
		svg: getFileUrl('icons/genre/cry.svg')
	},
	{
		title: 'love' as const,
		alt: 'love',
		gif: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Smiling%20Face%20With%20Hearts.webp',
		altEmoji: '😍',
		svg: getFileUrl('icons/genre/love.svg')
	},
	{
		title: 'horror' as const,
		alt: 'horror',
		gif: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Anxious%20Face%20With%20Sweat.webp',
		altEmoji: '😰',
		svg: getFileUrl('icons/genre/horror.svg')
	},
	{
		title: 'note' as const,
		alt: 'note',
		gif: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/People/Writing%20Hand.webp',
		altEmoji: '📝',
		svg: getFileUrl('icons/genre/note.svg')
	}
]

export type reactionsTitles = (typeof reactions)[number]['title']
