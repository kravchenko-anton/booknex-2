import { __decorate, __metadata, __param } from "tslib";
import { catalogSearchFields } from '@/src/catalog/catalog.fields';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import * as cacheManagerType from 'cache-manager';
import { RecommendationService } from '../recommendation/recommendation.service';
import { PrismaService } from '../utils/services/prisma.service';
let CatalogService = class CatalogService {
    constructor(prisma, recommendationService, cacheManager) {
        this.prisma = prisma;
        this.recommendationService = recommendationService;
        this.cacheManager = cacheManager;
    }
    search(query) {
        return this.prisma.book.findMany({
            where: catalogSearchFields(query)
        });
    }
    async featured(userId) {
        const alreadyUsedBookSlugs = [];
        const pushBooks = (books) => {
            alreadyUsedBookSlugs.push(...books.map(book => book.slug));
            return books;
        };
        const userSelectedGenres = await this.recommendationService.userSelectedGenresById(userId);
        const booksBySelectedGenres = userSelectedGenres.map(genre => this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true,
                genres: {
                    some: {
                        slug: genre.slug
                    }
                },
                slug: {
                    notIn: alreadyUsedBookSlugs
                }
            }
        }));
        return {
            picksOfWeek: await this.picksOfTheWeek(alreadyUsedBookSlugs).then(pushBooks),
            genres: await this.prisma.genre.findMany({}),
            bestSellingBooks: await this.bestSellersBooks(alreadyUsedBookSlugs).then(pushBooks),
            newReleases: await this.newReleases(alreadyUsedBookSlugs).then(pushBooks),
            booksBySelectedGenres: await Promise.all(booksBySelectedGenres)
        };
    }
    async picksOfTheWeek(skippedBookSlugs = []) {
        const picksOfTheWeek = await this.cacheManager.get('picksOfTheWeek');
        if (picksOfTheWeek)
            return picksOfTheWeek;
        const picks = await this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true,
                slug: {
                    notIn: skippedBookSlugs
                }
            }
        });
        const timeToSave = 60 * 60 * 24 * 7; // 1 week
        await this.cacheManager.set('picksOfTheWeek', picks, timeToSave);
        return picks;
    }
    bestSellersBooks(skippedBookSlugs = []) {
        return this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true,
                slug: {
                    notIn: skippedBookSlugs
                }
            },
            orderBy: {
                rating: 'desc'
            }
        });
    }
    newReleases(skippedBookSlugs = []) {
        return this.prisma.book.findMany({
            take: 10,
            where: {
                isPublic: true,
                slug: {
                    notIn: skippedBookSlugs
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
};
CatalogService = __decorate([
    Injectable(),
    __param(2, Inject(CACHE_MANAGER)),
    __metadata("design:paramtypes", [PrismaService,
        RecommendationService, Object])
], CatalogService);
export { CatalogService };
//# sourceMappingURL=catalog.service.js.map