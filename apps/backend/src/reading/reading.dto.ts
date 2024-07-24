import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { GptExplainSchema } from 'global/validation/reading/gpt-explain.schema'
import { TranslateTextSchema } from 'global/validation/reading/translate.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)
export class GptExplain extends createZodDto(GptExplainSchema) {}
export class TranslateText extends createZodDto(TranslateTextSchema) {}
