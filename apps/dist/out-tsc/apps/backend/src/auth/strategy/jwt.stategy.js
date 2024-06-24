import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../utils/services/prisma.service';
let JwtStrategy = class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService, prisma) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService?.get('JWT_SECRET')
        });
        this.prisma = prisma;
    }
    async validate({ id }) {
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }
};
JwtStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        PrismaService])
], JwtStrategy);
export { JwtStrategy };
//# sourceMappingURL=jwt.stategy.js.map