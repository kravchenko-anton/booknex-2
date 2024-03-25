import { HttpStatus, Injectable } from '@nestjs/common';
import { Activities } from '@prisma/client';
import { plainToClassFromExist } from 'class-transformer';
import { validate } from 'class-validator';
import { getFileUrl } from '../../../../../libs/global/api-config';
import { GlobalErrorsEnum } from '../../../../../libs/global/errors';
import { minutesToTime } from '../../../../../libs/global/helpers/time-converter';
import { serverError } from '../../utils/helpers/call-error';
import { ActivityService } from '../../utils/services/activity/activity.service';
import { PrismaService } from '../../utils/services/prisma.service';
import { PayloadEBook, type StoredEBook } from './ebook.model';

@Injectable()
export class EbookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityService: ActivityService
  ) {}
  async storedEbook(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select: {
        ebook: true
      }
    });
    if (!book) {
      throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.unknownError);
    }
    const ebook: StoredEBook[] = await fetch(getFileUrl(book.ebook))
      .then((result) => result.json())
      .catch(() => null);
    if (!ebook) {
      throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.unknownError);
    }
    const errors = await validate(plainToClassFromExist(PayloadEBook, ebook));
    if (errors.length > 0) {
      throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong);
    }
    return ebook;
  }

  async ebookById(id: number, userId: number) {
    const book = await this.prisma.book.findUnique({
      where: { id, visible: true },
      select: {
        title: true,
        ebook: true,
        picture: true
      }
    });
    if (!book) {
      throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.unknownError);
    }
    const ebook = await this.storedEbook(id);
    await this.activityService.create({
      type: Activities.getEbook,
      importance: 2,
      userId,
      bookId: id
    });

    return {
      ...book,
      file: ebook.map(({ chapters, title }) =>
        chapters
          .map(
            ({
              text,

              name,
              romanNumber,
              readingTime
            }) => `<section id="${name + ' ' + title}">
			<div style="
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;">
	<div>
	<a style="margin: 0; padding: 0; font-size: 18px; margin-bottom:4px">${name}</a>
	<p style="margin: 0; padding: 0;">${minutesToTime(readingTime)}</p>
  </div>
	<h2 style="margin: 0; padding: 0;">${romanNumber}</h2>
</div>
 ${text}
</section>`
          )
          .join(' ')
      ),
      chapters: ebook.map(({ title, chapters }) => ({
        title,
        children: chapters.map(({ name }) => ({
          name,
          link: `#${name + ' ' + title}`
        }))
      }))
    };
  }
}
