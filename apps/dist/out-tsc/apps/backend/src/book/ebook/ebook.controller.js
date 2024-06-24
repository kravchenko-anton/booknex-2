import { __decorate, __metadata, __param } from "tslib";
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { EbookOutput, StoredEBook } from './ebook.dto';
import { EbookService } from './ebook.service';
let EbookController = class EbookController {
    constructor(ebookService) {
        this.ebookService = ebookService;
    }
    async ebookBySlug(bookSlug) {
        return this.ebookService.ebookBySlug(bookSlug);
    }
    //  admin
    async storedEbookBySlug(bookSlug) {
        return this.ebookService.storedEbook(bookSlug);
    }
};
__decorate([
    Auth(),
    Get('/ebook/by-slug/:slug'),
    ApiOkResponse({ type: EbookOutput }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EbookController.prototype, "ebookBySlug", null);
__decorate([
    Auth('admin'),
    Get('/admin/stored-ebook/:slug'),
    ApiOkResponse({ type: [StoredEBook] }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EbookController.prototype, "storedEbookBySlug", null);
EbookController = __decorate([
    Controller('ebook'),
    ApiTags('📙 ebook'),
    __metadata("design:paramtypes", [EbookService])
], EbookController);
export { EbookController };
//# sourceMappingURL=ebook.controller.js.map