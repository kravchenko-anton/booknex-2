import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { BaseCatalogModel } from '../utils/common/base-catalog.model';
import { BookTemplate } from './parser.entity';

export class UnfoldOutput {
  @ApiProperty({
    type: Number,
    description: 'id of the chapter'
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: 'name of the chapter'
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'text of the chapter'
  })
  @IsString()
  text: string;
}

export class BookTemplateCatalogOutput extends BaseCatalogModel {
  @IsArray()
  @ApiProperty({
    type: [BookTemplate],
    description: 'book template'
  })
  @ValidateNested({ each: true })
  @Type(() => BookTemplate)
  data: BookTemplate[];
}
