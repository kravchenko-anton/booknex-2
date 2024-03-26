import { HttpStatus, Injectable } from '@nestjs/common';
import { Activities, type Prisma } from '@prisma/client';
import { AdminErrors, GlobalErrorsEnum } from '../../../../libs/global/errors';
import { transformActivity } from '../../../../libs/global/utils/activity-transformer';
import { slugify } from '../../../../libs/global/utils/slugify';
import { ReturnGenreObject } from '../genre/return.genre.object';
import { StorageService } from '../storage/storage.service';
import { StorageFolderEnum } from '../storage/storage.types';
import { serverError } from '../utils/helpers/call-error';
import { ActivityService } from '../utils/services/activity/activity.service';
import { PrismaService } from '../utils/services/prisma.service';
import type { CreateBookDto } from './dto/create.book.dto';
import type { UpdateBookDto } from './dto/update.book.dto';
import type { PayloadEBook } from './ebook/ebook.model';
import { useGetEbook } from './helpers/get-ebook';
import {
  catalogReturnObject,
  infoByIdAdminReturnObject,
  returnBookObject
} from './return.book.object';

@Injectable()
export class BookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityService: ActivityService,
    private storageService: StorageService
  ) {}

  async findOne({
    where,
    select,
    adminVisible = false
  }: {
    where?: Prisma.BookWhereUniqueInput;
    select?: Prisma.BookSelect;
    adminVisible: boolean;
  }) {
    const book = await this.prisma.book.findUnique({
      where: {
        ...(adminVisible ? {} : { visible: true }),
        ...where
      },
      select: {
        ...returnBookObject,
        ...select
      }
    });
    if (!book) {
      throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.unknownError);
    }
    return book;
  }

  async findMany({
    where,
    select,
    orderBy,
    take = 20,
    adminVisible = false
  }: {
    where?: Prisma.BookWhereInput;
    select?: Prisma.BookSelect;
    orderBy?: Prisma.BookOrderByWithRelationInput;
    take?: number;
    adminVisible?: boolean;
  }) {
    return this.prisma.book.findMany({
      where: {
        ...(adminVisible ? {} : { visible: true }),
        ...where
      },
      take,
      select: {
        ...returnBookObject,
        ...select
      },
      orderBy
    });
  }

  async infoById(id: number, userId: number) {
    const book = await this.findOne({
      where: { id: +id, visible: true },
      adminVisible: false,
      select: {
        description: true,
        mainGenre: false,
        readingTime: true,
        rating: true,
        genres: { select: ReturnGenreObject }
      }
    });

    await this.activityService.create({
      type: Activities.visitBook,
      importance: 1,
      userId,
      bookId: id
    });

    return book;
  }

  async infoByIdAdmin(id: number) {
    const book = await this.findOne(infoByIdAdminReturnObject(id));
    const { activities, ...rest } = book;

    return {
      ...rest,
      activities: transformActivity(activities)
    };
  }

  async catalog(searchTerm: string, page: number) {
    const perPage = 20;
    const count = await this.prisma.book.count();
    return {
      data: await this.findMany(
        catalogReturnObject({
          perPage,
          page,
          searchTerm
        })
      ),
      canLoadMore: page < Math.floor(count / perPage),
      totalPages: Math.floor(count / perPage)
    };
  }

  async create(dto: CreateBookDto) {
    const { genreIds, mainGenreId } = await this.getGenres(dto.genres);
    const { readingTime, uploadedEbook, chaptersCount } = useGetEbook(dto.ebook);

    const { name: ebookName } = await this.storageService.upload({
      folder: 'ebooks',
      file: Buffer.from(JSON.stringify(uploadedEbook)),
      role: 'admin',
      filename: dto.title + '.json'
    });
    const checkExist = await this.prisma.book.findUnique({
      where: {
        title: dto.title
      },
      select: {
        id: true
      }
    });
    if (checkExist) throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.bookAlreadyExist);
    await this.prisma.book.create({
      data: {
        slug: slugify(dto.title),
        activities: {
          create: {
            type: Activities.createBook,
            importance: 9
          }
        },
        chapters: chaptersCount,
        title: dto.title,
        picture: dto.picture,
        rating: dto.rating,
        readingTime: readingTime,
        description: dto.description,
        ebook: ebookName,
        author: dto.author,
        genres: {
          connect: genreIds
        },
        mainGenre: {
          connect: {
            id: mainGenreId
          }
        }
      }
    });
  }

  async remove(id: number) {
    await this.checkExist({
      adminVisible: true,
      where: { id }
    });
    await this.prisma.review.deleteMany({
      where: {
        bookId: id
      }
    });
    await this.prisma.book.delete({ where: { id } });
  }

  async updateEbook(id: number, dto: PayloadEBook[]) {
    await this.checkExist({
      adminVisible: true,
      where: { id }
    });
    const { uploadedEbook, readingTime, chaptersCount } = useGetEbook(dto);
    const book = await this.findOne({
      where: { id },
      adminVisible: true,
      select: {
        title: true
      }
    });
    const { name: ebookName } = await this.storageService.upload({
      folder: StorageFolderEnum.ebooks,
      file: Buffer.from(JSON.stringify(uploadedEbook)),
      role: 'admin',
      filename: `${book.title}.json`
    });
    await this.activityService.create({
      type: Activities.updateEBook,
      importance: 7,
      bookId: id
    });
    await this.prisma.book.update({
      where: { id },
      data: {
        ebook: ebookName,
        readingTime,
        chapters: chaptersCount
      }
    });
  }

  //TODO: переделать всё на один запрос обновления
  // async updatePicture(id: number, picture: Express.Multer.File) {
  //   const book = await this.findOne({
  //     where: { id },
  //     adminVisible: true,
  //     select: {
  //       title: true
  //     }
  //   });
  //   const { name: pictureName } = await this.storageService.upload({
  //     folder: 'booksCovers',
  //     file: picture.buffer,
  //     role: 'admin',
  //     filename: book.title + '.png'
  //   });
  //   await this.activityService.create({
  //     type: Activities.updatePicture,
  //     importance: 7,
  //     bookId: id
  //   });
  //   await this.prisma.book.update({
  //     where: { id },
  //     data: {
  //       picture: pictureName
  //     }
  //   });
  // }
  // async updateGenre(id: number, dto: UpdateGenreDto) {
  //   await this.checkExist({
  //     adminVisible: true,
  //     where: { id }
  //   });
  //   const { genreIds, mainGenreId } = await this.getGenres(dto.genres);
  //   await this.activityService.create({
  //     type: Activities.updateGenre,
  //     importance: 7,
  //     bookId: id
  //   });
  //   await this.prisma.book.update({
  //     where: { id },
  //     data: {
  //       genres: {
  //         set: genreIds
  //       },
  //       mainGenre: {
  //         connect: {
  //           id: mainGenreId
  //         }
  //       }
  //     }
  //   });
  // }
  async update(id: number, dto: UpdateBookDto) {
    const { genres, ebook, ...rest } = dto;
    await this.checkExist({
      adminVisible: true,
      where: { id }
    });
    await this.prisma.book.update({
      where: { id },
      data: rest
    });

    await this.activityService.create({
      type: Activities.updateBook,
      importance: 7,
      bookId: id
    });
  }
  async getGenres(genres: number[]) {
    const mainGenre = await this.prisma.genre.findFirst({
      where: {
        id: {
          in: genres
        }
      },
      select: {
        id: true
      },
      orderBy: {
        mainBooks: {
          _count: 'asc'
        }
      }
    });
    if (genres.length < 2 || !mainGenre)
      throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong);
    return {
      mainGenreId: mainGenre.id,
      genreIds: genres.map((id) => ({ id }))
    };
  }

  async checkExist({
    where,
    adminVisible = false
  }: {
    where: Prisma.BookWhereUniqueInput;
    adminVisible?: boolean;
  }) {
    const exist = await this.prisma.book.findUnique({
      where: { ...where, ...(adminVisible ? {} : { visible: true }) },
      select: {
        id: true
      }
    });

    if (!exist) throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong);

    return !!exist;
  }
}
