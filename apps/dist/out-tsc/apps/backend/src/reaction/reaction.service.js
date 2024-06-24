import { __decorate, __metadata } from "tslib";
import { serverError } from '@/src/utils/helpers/server-error';
import { PrismaService } from '@/src/utils/services/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { globalErrors } from 'global/errors';
let ReactionService = class ReactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createReactionDto) {
        const isUserExist = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!isUserExist) {
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        return this.prisma.reaction.create({
            data: {
                userId,
                ...createReactionDto
            }
        });
    }
    async update(userId, updateReactionDto) {
        const reaction = await this.prisma.reaction.findUnique({
            where: { id: updateReactionDto.id }
        });
        if (!reaction) {
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        const isUserExist = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!isUserExist) {
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        return this.prisma.reaction.update({
            where: {
                id: updateReactionDto.id
            },
            data: updateReactionDto
        });
    }
    async reactionByBook(bookSlug, userId) {
        const isUserExist = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!isUserExist) {
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        return this.prisma.reaction.findMany({
            where: {
                bookSlug,
                userId,
                book: {
                    isPublic: true
                }
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                endOffset: true,
                startOffset: true,
                xpath: true,
                type: true
            }
        });
    }
    async reactionList(userId) {
        const isUserExist = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!isUserExist) {
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        const reactionsCount = await this.prisma.reaction.groupBy({
            by: ['bookSlug'],
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            where: {
                userId,
                book: {
                    isPublic: true
                }
            }
        });
        const bookSlugs = reactionsCount.map(reaction => reaction.bookSlug);
        const books = await this.prisma.book.findMany({
            where: {
                slug: {
                    in: bookSlugs
                },
                isPublic: true
            },
            select: {
                picture: true,
                title: true,
                slug: true,
                author: true
            }
        });
        return reactionsCount.map(reaction => {
            const book = books.find(book => book.slug === reaction.bookSlug);
            if (!book)
                return;
            return {
                ...book,
                count: reaction._count.id
            };
        });
    }
    async remove(id, userId) {
        const reactionById = await this.prisma.reaction.findUnique({
            where: { id }
        });
        if (!reactionById) {
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        const isUserExist = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!isUserExist) {
            throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong);
        }
        return this.prisma.reaction.delete({
            where: {
                id,
                userId
            }
        });
    }
};
ReactionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReactionService);
export { ReactionService };
//# sourceMappingURL=reaction.service.js.map