import axios from 'axios'

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

	return {
		messages: request.data.messages.map(
			(message: {
				message: string
				extract: string
				lastLine: number
				lastColumn: number
				firstColumn: number
				hiliteStart: number
				hiliteLength: number
			}) =>
				`${message.message} at line ${message.lastLine} column ${message.lastColumn}:\n${message.extract}`
		),
		isValid: request.data.messages.length === 0
	}
}
