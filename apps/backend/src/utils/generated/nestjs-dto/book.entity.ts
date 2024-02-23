
import {Genre} from './genre.entity'
import {Review} from './review.entity'
import {User} from './user.entity'
import {Activity} from './activity.entity'


export class Book {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
title: string ;
author: string ;
description: string ;
picture: string ;
ebook: string ;
pages: number ;
popularity: number ;
visible: boolean ;
majorGenre?: Genre ;
genres?: Genre[] ;
review?: Review[] ;
finishedBy?: User[] ;
savedBy?: User[] ;
readingBy?: User[] ;
mainGenreId: number ;
activities?: Activity[] ;
}
