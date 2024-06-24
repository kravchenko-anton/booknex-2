import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../utils/services/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
let UserModule = class UserModule {
};
UserModule = __decorate([
    Module({
        controllers: [UserController],
        providers: [UserService, PrismaService],
        exports: [UserService],
        imports: [ConfigModule]
    })
], UserModule);
export { UserModule };
//# sourceMappingURL=user.module.js.map