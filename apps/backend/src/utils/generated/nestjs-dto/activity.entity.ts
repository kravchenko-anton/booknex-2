
import {Activities} from '@prisma/client'
import {Book} from './book.entity'
import {Genre} from './genre.entity'
import {User} from './user.entity'


export class Activity {
  id: number ;
createdAt: Date ;
book?: Book  | null;
genre?: Genre  | null;
genreId: number  | null;
bookId: number  | null;
userId: number  | null;
type: Activities ;
importance: number ;
user?: User  | null;
}
