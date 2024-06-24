import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getJwtConfig } from '../utils/config/jwt.config';
import { PrismaService } from '../utils/services/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.stategy';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        controllers: [AuthController],
        providers: [
            AuthService,
            PrismaService,
            JwtStrategy,
            UserService,
            ConfigService
        ],
        imports: [
            ConfigModule,
            JwtModule.registerAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: getJwtConfig
            })
        ]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map