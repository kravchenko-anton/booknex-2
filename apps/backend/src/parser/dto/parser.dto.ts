import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

interface ParserDtoPayload {
  url: string
  page: number

}
export class ParserDto implements ParserDtoPayload {
  @IsString()
  @ApiProperty()
  readonly url: string

  @IsNumber()
  @ApiProperty()
  readonly page: number
}
