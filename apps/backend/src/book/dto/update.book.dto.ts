import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  ValidateNested
} from 'class-validator';
import { Book } from '../book.entity';
import { PayloadEBook } from '../ebook/ebook.model';

export class UpdateBookPick extends PickType(Book, [
  'author',
  'description',
  'title',
  'visible',
  'rating',
  'picture'
]) {}
export class UpdateBookDto extends PartialType(UpdateBookPick) {
  @ApiProperty({
    description: 'Array of genres',
    example: [1, 2, 3],
    type: [Number],
    required: false
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  genres: number[];

  @ApiProperty({ type: [PayloadEBook], required: false })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => PayloadEBook)
  ebook: PayloadEBook[];
}
