import { __decorate, __metadata, __param } from "tslib";
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ShortBook } from '../book/book.dto';
import { FeaturedOutput } from './catalog.dto';
import { CatalogService } from './catalog.service';
let CatalogController = class CatalogController {
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    async search(query) {
        return this.catalogService.search(query);
    }
    async featured(userId) {
        return this.catalogService.featured(userId);
    }
    async picksOfTheWeek() {
        return this.catalogService.picksOfTheWeek();
    }
};
__decorate([
    Auth(),
    Get('/search/:query'),
    ApiOkResponse({ type: [ShortBook] }),
    __param(0, Param('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "search", null);
__decorate([
    Auth(),
    Get('/featured'),
    ApiOkResponse({ type: FeaturedOutput }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "featured", null);
__decorate([
    Get('/picks-of-the-week'),
    ApiOkResponse({ type: [ShortBook] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "picksOfTheWeek", null);
CatalogController = __decorate([
    ApiTags('📚 catalog'),
    ApiBearerAuth(),
    Controller('catalog'),
    __metadata("design:paramtypes", [CatalogService])
], CatalogController);
export { CatalogController };
//# sourceMappingURL=catalog.controller.js.map