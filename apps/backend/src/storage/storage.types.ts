export const StorageFolderEnum = {
  ebooks: 'ebooks' as const,
  booksCovers: 'booksCovers' as const
};

export type StorageFolderType = keyof typeof StorageFolderEnum;
export const StorageFolderArray: string[] = [
  StorageFolderEnum.ebooks,
  StorageFolderEnum.booksCovers
];
