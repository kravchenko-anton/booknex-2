import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class ReviewBookDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 5,
    description: 'rating'
  })
  rating: number;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: [String],
    description: 'tags'
  })
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @ApiProperty({
    example: 'comment',
    description: 'comment',
    required: false
  })
  @IsString()
  comment?: string;
}
