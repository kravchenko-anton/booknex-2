import type { EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events'
import type { HTMLAttributes } from 'react'
import type { Events } from 'tinymce'

export type EEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<
	Events.EditorEventMap[K]
>

export type RichEditorProperties = {
	value: string
	withAi?: boolean
	simple?: boolean
} & Pick<
	HTMLAttributes<HTMLTextAreaElement>,
	'defaultValue' | 'className' | 'style'
> & {
		onChange: EventHandler<unknown>
		placeholder: string
		onBlur: EEventHandler<'blur'>
	}
