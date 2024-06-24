import { __decorate, __metadata, __param } from "tslib";
import { BookTemplateCatalogOutput, UnfoldOutput } from '@/src/parser/parser.dto';
import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { BookTemplate, ParserDto } from './parser.dto';
import { ParserService } from './parser.service';
let ParserController = class ParserController {
    constructor(parserService) {
        this.parserService = parserService;
    }
    async catalog(searchTerm, page) {
        return this.parserService.catalog(searchTerm, page || 1);
    }
    bySlug(slug) {
        return this.parserService.bySlug(slug);
    }
    async parse(dto) {
        return this.parserService.parse(dto);
    }
    async unfold(file) {
        return this.parserService.unfold(file);
    }
    async remove(slug) {
        return this.parserService.remove(slug);
    }
};
__decorate([
    Get('admin/catalog'),
    ApiOkResponse({ type: BookTemplateCatalogOutput }),
    ApiQuery({ name: 'searchTerm', required: false, example: 'The Hobbit' }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    __param(0, Query('searchTerm')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ParserController.prototype, "catalog", null);
__decorate([
    Get('admin/by-slug/:slug'),
    ApiOkResponse({ type: BookTemplate }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParserController.prototype, "bySlug", null);
__decorate([
    Post('admin/parse'),
    ApiBody({ type: ParserDto }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ParserDto]),
    __metadata("design:returntype", Promise)
], ParserController.prototype, "parse", null);
__decorate([
    Post('admin/unfold'),
    ApiOkResponse({
        type: UnfoldOutput,
        description: 'Unfolded book content'
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    UseInterceptors(FileInterceptor('file')),
    __param(0, UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 10000000000
            })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParserController.prototype, "unfold", null);
__decorate([
    Delete('admin/remove/:slug'),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParserController.prototype, "remove", null);
ParserController = __decorate([
    Auth('admin'),
    ApiTags('📦 parser'),
    ApiBearerAuth(),
    Controller('parser'),
    __metadata("design:paramtypes", [ParserService])
], ParserController);
export { ParserController };
//# sourceMappingURL=parser.controller.js.map