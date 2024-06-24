import { __decorate, __metadata, __param } from "tslib";
import { Auth } from '@/src/auth/decorators/auth.decorator';
import { CurrentUser } from '@/src/auth/decorators/user.decorator';
import { CreateReaction, ReactionByBookOutput, ReactionListOutput, UpdateReaction } from '@/src/reaction/reaction.dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReactionService } from './reaction.service';
let ReactionController = class ReactionController {
    constructor(reactionService) {
        this.reactionService = reactionService;
    }
    create(userId, dto) {
        return this.reactionService.create(userId, dto);
    }
    reactionList(userId) {
        return this.reactionService.reactionList(userId);
    }
    reactionByBook(bookSlug, userId) {
        return this.reactionService.reactionByBook(bookSlug, userId);
    }
    update(userId, dto) {
        return this.reactionService.update(userId, dto);
    }
    remove(id, userId) {
        return this.reactionService.remove(id, userId);
    }
};
__decorate([
    Auth(),
    Post('/create'),
    ApiBody({ type: CreateReaction }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateReaction]),
    __metadata("design:returntype", void 0)
], ReactionController.prototype, "create", null);
__decorate([
    Auth(),
    Get('/reaction-list'),
    ApiOkResponse({ type: [ReactionListOutput] }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReactionController.prototype, "reactionList", null);
__decorate([
    Auth(),
    Get('/reaction-by-book/:bookSlug'),
    ApiOkResponse({ type: ReactionByBookOutput, isArray: true }),
    __param(0, Param('bookSlug')),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "reactionByBook", null);
__decorate([
    Auth(),
    Post('/update'),
    ApiBody({ type: UpdateReaction }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateReaction]),
    __metadata("design:returntype", void 0)
], ReactionController.prototype, "update", null);
__decorate([
    Auth(),
    Put('/delete/:id'),
    __param(0, Param('id')),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReactionController.prototype, "remove", null);
ReactionController = __decorate([
    ApiBearerAuth(),
    Controller('reaction'),
    ApiTags('👍 Reaction'),
    __metadata("design:paramtypes", [ReactionService])
], ReactionController);
export { ReactionController };
//# sourceMappingURL=reaction.controller.js.map