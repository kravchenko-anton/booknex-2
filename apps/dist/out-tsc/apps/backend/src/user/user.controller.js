import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ReadingHistory, UserCatalogOutput, UserLibraryOutput, UserStatistics } from './user.dto';
import { UserService } from './user.service';
let UserController = class UserController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async library(userId, dto) {
        await this.usersService.syncHistory(dto, userId);
        return this.usersService.library(userId);
    }
    async syncHistory(userId, dto) {
        await this.usersService.syncHistory(dto, userId);
    }
    async statistics(userId, dto) {
        await this.usersService.syncHistory(dto, userId);
        return this.usersService.userStatistics(userId);
    }
    async adjustGoal(userId, goal) {
        return this.usersService.adjustGoal(userId, Number(goal) || 0);
    }
    async startReading(userId, slug) {
        return this.usersService.startReading(userId, slug);
    }
    async finishReading(userId, slug) {
        return this.usersService.finishReading(userId, slug);
    }
    async removeFromLibrary(userId, slug) {
        return this.usersService.removeFromLibrary(userId, slug);
    }
    async toggleSave(userId, slug) {
        return this.usersService.toggleSave(userId, slug);
    }
    async isSaved(userId, slug) {
        return this.usersService.isSaved(userId, slug);
    }
    // admin
    async catalog(searchTerm, cursor) {
        return this.usersService.catalog(searchTerm || '', cursor);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
};
__decorate([
    Auth(),
    Post('/library'),
    ApiOkResponse({ type: UserLibraryOutput }),
    ApiBody({ type: [ReadingHistory] }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "library", null);
__decorate([
    Auth(),
    Post('/sync-history'),
    ApiBody({ type: [ReadingHistory] }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "syncHistory", null);
__decorate([
    Auth(),
    Post('/statistics'),
    ApiBody({ type: [ReadingHistory] }),
    ApiOkResponse({ type: UserStatistics }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "statistics", null);
__decorate([
    Auth(),
    Patch('/adjust-goal'),
    __param(0, CurrentUser('id')),
    __param(1, Query('goal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "adjustGoal", null);
__decorate([
    Auth(),
    Patch('/start-reading/:slug'),
    __param(0, CurrentUser('id')),
    __param(1, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "startReading", null);
__decorate([
    Auth(),
    Patch('/finish-reading/:slug'),
    __param(0, CurrentUser('id')),
    __param(1, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "finishReading", null);
__decorate([
    Auth(),
    Patch('/remove-from-library/:slug'),
    __param(0, CurrentUser('id')),
    __param(1, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeFromLibrary", null);
__decorate([
    Auth(),
    Patch('/toggle-save/:slug'),
    ApiOkResponse({ type: Boolean }),
    __param(0, CurrentUser('id')),
    __param(1, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleSave", null);
__decorate([
    Auth(),
    Get('/is-saved/:slug'),
    ApiOkResponse({ type: Boolean }),
    __param(0, CurrentUser('id')),
    __param(1, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isSaved", null);
__decorate([
    Auth('admin'),
    Get('admin/catalog'),
    ApiOkResponse({ type: UserCatalogOutput }),
    __param(0, Query('searchTerm')),
    __param(1, Query('cursor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "catalog", null);
__decorate([
    Auth('admin'),
    Delete('admin/remove/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    ApiBearerAuth(),
    Controller('user'),
    ApiTags('👤 user'),
    __metadata("design:paramtypes", [UserService])
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map