import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { UploadOutputSchema } from 'global/validation/upload/upload.schema';
import { z } from 'zod';
extendZodWithOpenApi(z);
export class UploadOutputDto extends createZodDto(UploadOutputSchema) {
}
//# sourceMappingURL=storage.dto.js.map