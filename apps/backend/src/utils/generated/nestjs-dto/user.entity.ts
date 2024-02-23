
import {Role} from '@prisma/client'
import {Genre} from './genre.entity'
import {Review} from './review.entity'
import {Book} from './book.entity'
import {Activity} from './activity.entity'


export class User {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
email: string ;
socialId: string  | null;
password: string  | null;
selectedGenres?: Genre[] ;
picture: string ;
fullName: string ;
location: string ;
role: Role ;
review?: Review[] ;
savedBooks?: Book[] ;
finishedBooks?: Book[] ;
readingBooks?: Book[] ;
activity?: Activity[] ;
}
