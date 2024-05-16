import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { z } from 'zod'
import { CreateActivitySchema } from '../../../../libs/global/validation/activity/create-activity.schema'

extendZodWithOpenApi(z)

export class CreateActivityDto extends createZodDto(CreateActivitySchema) {}
