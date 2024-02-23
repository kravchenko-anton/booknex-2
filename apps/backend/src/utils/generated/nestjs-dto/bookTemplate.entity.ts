
import {Genre} from './genre.entity'


export class BookTemplate {
  id: number ;
createdAt: Date ;
updatedAt: Date ;
title: string ;
author: string ;
description: string ;
picture: string ;
pages: number ;
popularity: number ;
genres?: Genre[] ;
}
