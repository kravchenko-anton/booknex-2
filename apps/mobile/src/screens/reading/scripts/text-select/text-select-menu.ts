export const selectionKeys = {
	note: 'note',
	quote: 'quote',
	share: 'share',
	translate: 'translate'
}
export const selectTextMenu = (withHighlight: boolean) => [
	...(withHighlight
		? [
				{ label: 'Note', key: selectionKeys.note },
				{ label: 'Quote', key: selectionKeys.quote }
			]
		: []),
	{
		label: 'Share',
		key: selectionKeys.share
	},
	{ label: 'Translate', key: selectionKeys.translate }
]
