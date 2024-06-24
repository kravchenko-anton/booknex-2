import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { ChapterPayloadSchema, ChapterSchema } from '../../../../../libs/global/validation/ebook/chapter.schema';
import { EbookOutputSchema, StoredEBookSchema } from '../../../../../libs/global/validation/ebook/ebook.schema';
extendZodWithOpenApi(z);
export class ChapterType extends createZodDto(ChapterSchema) {
}
export class StoredEBook extends createZodDto(StoredEBookSchema) {
}
export class BaseChapter extends createZodDto(ChapterPayloadSchema) {
}
export class EbookOutput extends createZodDto(EbookOutputSchema) {
}
//# sourceMappingURL=ebook.dto.js.map