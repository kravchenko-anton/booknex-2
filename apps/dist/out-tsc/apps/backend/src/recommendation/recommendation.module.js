import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { PrismaService } from '../utils/services/prisma.service';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
let RecommendationModule = class RecommendationModule {
};
RecommendationModule = __decorate([
    Module({
        controllers: [RecommendationController],
        providers: [RecommendationService, PrismaService]
    })
], RecommendationModule);
export { RecommendationModule };
//# sourceMappingURL=recommendation.module.js.map