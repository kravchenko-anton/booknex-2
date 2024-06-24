import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ShortGenre } from '../genre/genre.dto';
import { UpdateRecommendationDto } from './recommendation.dto';
import { RecommendationService } from './recommendation.service';
let RecommendationController = class RecommendationController {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;
    }
    async updateRecommendation(userId, dto) {
        return this.recommendationService.updateSelectedGenres(userId, dto);
    }
    async currentRecommendation(userId) {
        return this.recommendationService.userSelectedGenresById(userId);
    }
};
__decorate([
    Auth(),
    Post('/update-recommendation'),
    ApiOkResponse({ description: 'Recommendation updated' }),
    ApiBody({ type: UpdateRecommendationDto }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateRecommendationDto]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "updateRecommendation", null);
__decorate([
    Auth(),
    Get('/recommendation-genre'),
    ApiOkResponse({
        type: [ShortGenre],
        description: 'Recommendation genres'
    }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "currentRecommendation", null);
RecommendationController = __decorate([
    Controller('recommendation'),
    ApiTags('📨 recommendation'),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [RecommendationService])
], RecommendationController);
export { RecommendationController };
//# sourceMappingURL=recommendation.controller.js.map