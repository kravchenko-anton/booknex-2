
import {Activities} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateActivityDto {
  @ApiProperty({ enum: Activities})
type: Activities;
importance: number;
}
