import type { RichEditorProperties } from '@/components/html-editor/types'
import { Editor } from '@tinymce/tinymce-react'
import type { FC } from 'react'

const HtmlEditor: FC<RichEditorProperties> = ({
	className,
	style,
	...properties
}) => {
	return (
		<div className={className} style={style}>
			<Editor
				ref={properties.reference}
				apiKey={process.env.TINYMCE}
				init={{
					placeholder: 'Type something...',
					menubar: true,
					branding: false,
					skin: 'oxide-dark',
					height: 'calc(100vh)',
					content_css: 'dark',
					ai_request: (
						request: {
							prompt: string
						},
						respondWith: {
							string: (
								signal: (signal: AbortSignal) => Promise<string>
							) => string
						}
					) => {
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
						respondWith.string((signal: AbortSignal) =>
							// TODO: перенести на perplixity api
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
						'anchor autolink ai charmap codesample preview book-lists media searchreplace  visualblocks wordcount checklist mediaembed casechange pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
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

export default HtmlEditor
