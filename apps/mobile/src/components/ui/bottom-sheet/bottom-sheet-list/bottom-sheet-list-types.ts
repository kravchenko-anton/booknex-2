import type { FC } from 'react'

export enum BottomSheetListPagesEnum {
  reader = 'reader'
}
export interface SheetType {
  name: BottomSheetListEnum
  snapPoints: (string | number)[]
  component: FC
}
export enum BottomSheetListEnum {
  readerSettings = 'reader/settings',
  readerSearch = 'reader/Search',
  readerNoteBook = 'reader/NoteBook',
  readerChapters = 'reader/Chapters',
  readerSelectTheme = 'reader/Select-theme'
}
