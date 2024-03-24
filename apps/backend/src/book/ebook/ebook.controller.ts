import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { CurrentUser } from '../../auth/decorators/user.decorator';
import { EbookByIdOutput, StoredEBook } from './ebook.model';
import { EbookService } from './ebook.service';

@Controller('ebook')
@ApiTags('📙 ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  @Auth()
  @Get('/ebook/by-id/:id')
  @ApiOkResponse({ type: EbookByIdOutput })
  async ebookById(
    @Param('id') bookId: number,
    @CurrentUser('id') userId: string
  ): Promise<EbookByIdOutput> {
    return this.ebookService.ebookById(+bookId, +userId);
  }

  //  admin
  @Auth('admin')
  @Get('/admin/stored-ebook/:id')
  @ApiOkResponse({ type: [StoredEBook] })
  async storedEbook(@Param('id') bookId: number): Promise<StoredEBook[]> {
    return this.ebookService.storedEbook(+bookId);
  }
}
