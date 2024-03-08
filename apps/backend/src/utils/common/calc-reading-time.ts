function readingTime(text: string) {
	const averageWPM = 250

	const adjustedText = text.replaceAll(/(.)\1+/g, '$1')

	const adjustedSentences = adjustedText.replaceAll(/([!.?])\s*\1+/g, '$1')

	const adjustedCharCount = adjustedSentences.length

	const adjustedWords = adjustedSentences.trim().split(/\s+/)
	const adjustedWordCount = adjustedWords.length
	const averageWordLength = adjustedCharCount / adjustedWordCount

	const adjustedTime =
		(adjustedCharCount / averageWPM) * (averageWordLength / 5)

	return adjustedTime > 1
		? Math.round(adjustedTime) + ' min'
		: 'Less than 1 min'
}
