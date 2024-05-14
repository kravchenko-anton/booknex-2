import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { CreateActivityDtoSchema } from 'global/validation/activity/create-activity.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)

export class CreateActivityDto extends createZodDto(CreateActivityDtoSchema) {}
