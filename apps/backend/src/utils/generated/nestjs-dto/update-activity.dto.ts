
import {Activities} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateActivityDto {
  @ApiProperty({ enum: Activities})
type?: Activities;
importance?: number;
}
