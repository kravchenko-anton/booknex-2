import { __decorate, __metadata } from "tslib";
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
let HealthController = class HealthController {
    constructor(health, http) {
        this.health = health;
        this.http = http;
    }
    check() {
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
        ]);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ description: 'Health check', type: Object }),
    HealthCheck(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
HealthController = __decorate([
    Controller('health'),
    ApiTags('❤️ health'),
    __metadata("design:paramtypes", [HealthCheckService,
        HttpHealthIndicator])
], HealthController);
export { HealthController };
//# sourceMappingURL=health.controller.js.map