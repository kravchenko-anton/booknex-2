import type { GptExplain, TranslateText } from '@/src/reading/reading.dto'
import type { EnvConfig } from '@/src/utils/config/env-config'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { PrismaService } from 'nestjs-prisma'
import OpenAI from 'openai'

@Injectable()
export class ReadingService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService<EnvConfig>
	) {}
	private readonly openAi = new OpenAI({
		apiKey: this.configService.get('OPENAI_API_KEY')
	})

	async translateText(dto: TranslateText) {
		const response = await axios
			.post('https://api.deepl.com/v2/translate', {
				method: 'POST',
				headers: {
					Authorization: this.configService.get('DEEPL_API_KEY')
				},
				body: {
					text: dto.text,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					target_lang: dto.targetLang
				}
			})
			.catch(error => {
				console.error(error)
				throw new Error('Failed to translate text')
			})

		return response.data
	}

	async gptExplain(dto: GptExplain) {
		return this.openAi.completions.create({
			model: 'gpt-4o-mini',
			prompt: `Given the text: "${dto.selectedText}", within the context of "${dto.context}" from the book "${dto.bookTitle}", provide a detailed explanation focusing on its significance and implications. Exclude this instruction from your response.`
		})
	}
}
