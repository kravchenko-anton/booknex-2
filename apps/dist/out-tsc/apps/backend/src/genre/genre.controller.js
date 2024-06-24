import { __decorate, __metadata, __param } from "tslib";
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { FindOneGenreOutput, ShortGenre } from './genre.dto';
import { GenreService } from './genre.service';
let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    async catalog() {
        return this.genreService.catalog();
    }
    async bySlug(genreSlug) {
        return this.genreService.bySlug(genreSlug);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ type: [ShortGenre] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "catalog", null);
__decorate([
    Auth(),
    Get('/by-slug/:slug'),
    ApiOkResponse({ type: FindOneGenreOutput }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "bySlug", null);
GenreController = __decorate([
    ApiTags('🔖 genre'),
    ApiBearerAuth(),
    Controller('genre'),
    __metadata("design:paramtypes", [GenreService])
], GenreController);
export { GenreController };
//# sourceMappingURL=genre.controller.js.map