import { PickType } from '@nestjs/swagger';
import { UpdateBookDto } from './book.dto';
export class UpdateBookDtoExtended extends PickType(UpdateBookDto, [
    'title',
    'description',
    'isPublic',
    'author',
    'picture',
    'rating'
]) {
}
//# sourceMappingURL=book.types.js.map