import { Activities } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class CreateActivityDto {
  @IsEnum(Activities)
  type: Activities;

  @IsNumber()
  @Min(1)
  @Max(10)
  importance: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  userId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  bookId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  genreId?: number;
}
