import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto, AuthOutput, GoogleAuthDto, RefreshDto } from './auth.dto';
import { AuthService } from './auth.service';
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleSign(dto) {
        return this.authService.googleSign(dto);
    }
    async mailRegister(dto) {
        return this.authService.register(dto);
    }
    async mailLogin(dto) {
        return this.authService.login(dto);
    }
    async refreshToken(dto) {
        return this.authService.refresh(dto.refreshToken);
    }
};
__decorate([
    Post('/google-sign'),
    ApiOkResponse({
        description: 'Return access and refresh token',
        type: AuthOutput
    }),
    ApiBody({
        type: GoogleAuthDto,
        description: 'Sign in with google account'
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GoogleAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSign", null);
__decorate([
    Post('/mail-register'),
    ApiBody({
        type: AuthDto,
        description: 'Register new user'
    }),
    ApiOkResponse({
        description: 'Return access and refresh token',
        type: AuthOutput
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "mailRegister", null);
__decorate([
    Post('/mail-login'),
    ApiBody({
        type: AuthDto,
        description: 'Login user'
    }),
    ApiOkResponse({
        description: 'Return access and refresh token',
        type: AuthOutput
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "mailLogin", null);
__decorate([
    Post('/refresh'),
    ApiBody({
        type: RefreshDto,
        description: 'Refresh access token'
    }),
    ApiOkResponse({
        description: 'Return access token',
        type: AuthOutput
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    ApiTags('🔐 auth'),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map