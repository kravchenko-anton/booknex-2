
import {User} from './user.entity'
import {Book} from './book.entity'
import {BookTemplate} from './bookTemplate.entity'
import {Activity} from './activity.entity'


export class Genre {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
name: string ;
description: string ;
users?: User[] ;
books?: Book[] ;
majorBooks?: Book[] ;
similarBy?: Genre[] ;
similar?: Genre[] ;
bookTemplates?: BookTemplate[] ;
activities?: Activity[] ;
}
