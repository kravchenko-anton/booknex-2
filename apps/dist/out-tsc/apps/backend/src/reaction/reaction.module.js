import { __decorate } from "tslib";
import { PrismaService } from '@/src/utils/services/prisma.service';
import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
let ReactionModule = class ReactionModule {
};
ReactionModule = __decorate([
    Module({
        controllers: [ReactionController],
        providers: [ReactionService, PrismaService]
    })
], ReactionModule);
export { ReactionModule };
//# sourceMappingURL=reaction.module.js.map