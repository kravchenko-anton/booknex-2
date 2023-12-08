import { Editor } from '@tinymce/tinymce-react'
import type { EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events'
import type { FC, HTMLAttributes } from 'react'
import type { Events } from 'tinymce'

type EEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<
	Events.EditorEventMap[K]
>

type RichEditorProperties = {
	value: string
	withAi?: boolean
	simple?: boolean
} & Pick<
	HTMLAttributes<HTMLTextAreaElement>,
	'defaultValue' | 'className' | 'style' | 'placeholder'
> & {
		onChange: EventHandler<unknown>
		onBlur: EEventHandler<'blur'>
	}
const RichEditor: FC<RichEditorProperties> = ({
	className,
	style,
	...properties
}) => {
	return (
		<div className={className} style={style}>
			<Editor
				apiKey={process.env.TINYMCE}
				init={{
					menubar: true,
					branding: false,
					ai_request: (request, respondWith) => {
						const openAiOptions = {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${process.env.GPT_TINYMCE}`
							},
							body: JSON.stringify({
								model: 'gpt-3.5-turbo',
								temperature: 0.7,
								max_tokens: 800,
								messages: [{ role: 'user', content: request.prompt }]
							})
						}
						respondWith.string(signal =>
							window
								.fetch(
									'https://openai.ai-demo-proxy.tiny.cloud/v1/chat/completions',
									{
										signal,
										...openAiOptions
									}
								)
								.then(async response => {
									if (response) {
										const data = await response.json()
										if (data.error) {
											throw new Error(
												`${data.error.type}: ${data.error.message}`
											)
										} else if (response.ok) {
											// Extract the response content from the data returned by the API
											return data?.choices[0]?.message?.content?.trim()
										}
									} else {
										throw new Error(
											'Failed to communicate with the ChatGPT API'
										)
									}
								})
						)
					},
					plugins:
						'anchor autolink ai charmap codesample preview lists media searchreplace  visualblocks wordcount checklist mediaembed casechange pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
					toolbar:
						'undo redo | aidialog | blocks  fontsize | bold italic underline strikethrough  align lineheight |  removeformat',
					toolbar_mode: 'floating',
					toolbar_sticky: true,
					toolbar_drawer: 'floating'
				}}
				{...properties}
			/>
		</div>
	)
}

export default RichEditor
