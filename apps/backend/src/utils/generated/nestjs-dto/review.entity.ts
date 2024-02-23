
import {Book} from './book.entity'
import {User} from './user.entity'


export class Review {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
rating: number ;
tags: string[] ;
text: string ;
book?: Book ;
user?: User ;
bookId: number ;
userId: number ;
}
