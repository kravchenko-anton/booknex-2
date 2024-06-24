import { __decorate, __metadata, __param } from "tslib";
import { CatalogOutput, CreateBookDto, FullBook, InfoBySlug, UpdateBookDto } from '@/src/book/book.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { BookService } from './book.service';
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async infoBySlug(bookSlug) {
        return this.bookService.infoBySlug(bookSlug);
    }
    async adminInfoBySlug(slug) {
        return this.bookService.infoBySlugAdmin(slug);
    }
    async catalog(searchTerm, page) {
        return this.bookService.catalog(searchTerm, page || 1);
    }
    async create(dto) {
        return this.bookService.create(dto);
    }
    async update(bookSlug, dto) {
        return this.bookService.update(bookSlug, dto);
    }
    async remove(slug) {
        return this.bookService.remove(slug);
    }
};
__decorate([
    Get('/info/by-slug/:slug'),
    ApiOkResponse({ type: InfoBySlug }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "infoBySlug", null);
__decorate([
    Auth('admin'),
    Get('/admin-info/by-slug/:slug'),
    ApiOkResponse({ type: FullBook }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "adminInfoBySlug", null);
__decorate([
    Auth('admin'),
    Get('/admin/catalog'),
    ApiOkResponse({ type: CatalogOutput }),
    __param(0, Query('searchTerm')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "catalog", null);
__decorate([
    Auth('admin'),
    Post('admin/create'),
    ApiOkResponse({ type: undefined }),
    ApiBody({
        type: CreateBookDto,
        description: 'Create book'
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
__decorate([
    Auth('admin'),
    ApiOkResponse({ type: undefined }),
    Put('admin/update/:slug'),
    __param(0, Param('slug')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
__decorate([
    Auth('admin'),
    ApiOkResponse({ type: undefined }),
    Delete('admin/remove/:slug'),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "remove", null);
BookController = __decorate([
    ApiTags('📙 book'),
    ApiBearerAuth(),
    Controller('book'),
    __metadata("design:paramtypes", [BookService])
], BookController);
export { BookController };
//# sourceMappingURL=book.controller.js.map