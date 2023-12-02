import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Auth } from '../decorator/auth.decorator'
import { ParserDto } from './dto/parser.dto'
import { ParserService } from './parser.service'

@Auth('admin')
@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('/all')
  async all(@Query('searchTerm') searchTerm: string) {
    return this.parserService.all(searchTerm)
  }

  @Post('/parse')
  // disable timeout

  async parse(@Body() dto: ParserDto) {
    return this.parserService.parse(dto)
  }
}
