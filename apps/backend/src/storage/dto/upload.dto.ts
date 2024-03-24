import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadOutputDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;
}
