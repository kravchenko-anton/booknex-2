import { __decorate, __metadata } from "tslib";
import { ReturnGenreObject } from '@/src/genre/return.genre.object';
import { HttpStatus, Injectable } from '@nestjs/common';
import { adminErrors } from 'global/errors';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
let RecommendationService = class RecommendationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async userSelectedGenresById(userId) {
        const userSelectedGenres = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                selectedGenres: {
                    select: ReturnGenreObject
                }
            }
        });
        return userSelectedGenres?.selectedGenres || [];
    }
    async updateSelectedGenres(id, dto) {
        await this.checkUserExist(id);
        const selectedGenres = await this.prisma.genre.findMany({
            where: {
                slug: {
                    in: dto.genreSlugs
                }
            },
            select: {
                id: true
            }
        });
        await this.prisma.user.update({
            where: { id },
            data: {
                selectedGenres: {
                    set: selectedGenres
                }
            }
        });
    }
    async checkUserExist(id) {
        const userExist = await this.prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true
            }
        });
        if (!userExist)
            throw serverError(HttpStatus.BAD_REQUEST, adminErrors.userNotFound);
        return !!userExist;
    }
};
RecommendationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], RecommendationService);
export { RecommendationService };
//# sourceMappingURL=recommendation.service.js.map