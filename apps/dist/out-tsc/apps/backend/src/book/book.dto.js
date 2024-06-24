import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { BookSchema, CatalogOutputSchema, FullBookSchema, infoBySlugSchema, ShortBookSchema } from 'global/validation/book/book.schema';
import { CreateBookSchema } from 'global/validation/book/create.book.schema';
import { UpdateBookSchema } from 'global/validation/book/update.book.schema';
import { z } from 'zod';
extendZodWithOpenApi(z);
export class CreateBookDto extends createZodDto(CreateBookSchema) {
}
export class ShortBook extends createZodDto(ShortBookSchema) {
}
export class UpdateBookDto extends createZodDto(UpdateBookSchema) {
}
export class Book extends createZodDto(BookSchema) {
}
export class FullBook extends createZodDto(FullBookSchema) {
}
export class CatalogOutput extends createZodDto(CatalogOutputSchema) {
}
export class InfoBySlug extends createZodDto(infoBySlugSchema) {
}
//# sourceMappingURL=book.dto.js.map