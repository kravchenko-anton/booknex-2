import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { GenreService } from '../genre/genre.service';
import { RecommendationService } from '../recommendation/recommendation.service';
import { PrismaService } from '../utils/services/prisma.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
let CatalogModule = class CatalogModule {
};
CatalogModule = __decorate([
    Module({
        controllers: [CatalogController],
        providers: [
            CatalogService,
            PrismaService,
            GenreService,
            RecommendationService
        ]
    })
], CatalogModule);
export { CatalogModule };
//# sourceMappingURL=catalog.module.js.map