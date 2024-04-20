import axios from 'axios'

type HtmlValidationMessageType = {
	message: string
	extract: string
	lastLine: number
	lastColumn: number
	firstColumn: number
	hiliteStart: number
	hiliteLength: number
}
export const checkHtmlValid = async (html: string) => {
	const postProcessingHtml = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>Test</title>
			</head>
			<body>
				${html}
			</body>
		</html>
	
	`

	const request = await axios.request({
		method: 'POST',
		url: 'https://validator.w3.org/nu/?out=json',
		data: postProcessingHtml,
		headers: {
			'Content-Type': 'text/html; charset=utf-8'
		}
	})

	const skippedErrors = ['Element “dl” is missing a required child element']
	const messages = request.data.messages
		.filter(
			(message: HtmlValidationMessageType) =>
				!skippedErrors.some(error =>
					message.message.toLowerCase().includes(error.toLowerCase())
				)
		)
		.map(
			(message: HtmlValidationMessageType) =>
				`${message.message} at line ${message.lastLine} column ${message.lastColumn}:\n${message.extract}`
		)
	return {
		messages: messages,
		isValid: messages.length === 0
	}
}
