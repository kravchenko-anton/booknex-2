import { __decorate } from "tslib";
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
let HealthModule = class HealthModule {
};
HealthModule = __decorate([
    Module({
        imports: [TerminusModule, HttpModule],
        controllers: [HealthController]
    })
], HealthModule);
export { HealthModule };
//# sourceMappingURL=health.module.js.map