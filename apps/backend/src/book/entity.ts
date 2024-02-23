//model Book {
//   id          Int      @id @default(autoincrement())
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   title       String   @unique
//   author      String
//   description String
//   picture     String
//   ebook       String
//   pages       Int
//   popularity  Int          @default(0)
//   visible     Boolean      @default(false)
//   majorGenre  Genre        @relation("BookMajorGenre", fields: [mainGenreId], references: [id])
//   genres      Genre[]      @relation("BookGenre")
//   review    Review[]
//   finishedBy  User[]       @relation("FinishedBooks")
//   savedBy     User[]       @relation("SavedBooks")
//   readingBy   User[]       @relation("ReadingBooks")
//   mainGenreId Int
//   activities  Activity[]
// }

export class BookEntity {
	id: number
	createdAt: Date
	updatedAt: Date
	title: string
}
