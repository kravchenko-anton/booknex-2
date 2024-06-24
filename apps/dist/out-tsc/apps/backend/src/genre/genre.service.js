import { __decorate, __metadata } from "tslib";
import { HttpStatus, Injectable } from '@nestjs/common';
import { globalErrors } from 'global/errors';
import { returnBookObject } from '../book/return.book.object';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import { ReturnGenreObject } from './return.genre.object';
let GenreService = class GenreService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    catalog() {
        return this.prisma.genre.findMany({
            select: ReturnGenreObject
        });
    }
    async bySlug(slug) {
        const genre = await this.prisma.genre.findUnique({
            where: {
                slug
            },
            select: {
                ...ReturnGenreObject,
                books: {
                    select: returnBookObject,
                    where: {
                        isPublic: true
                    }
                }
            }
        });
        if (!genre)
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        return genre;
    }
};
GenreService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], GenreService);
export { GenreService };
//# sourceMappingURL=genre.service.js.map