import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    Module({
        controllers: [StorageController],
        providers: [StorageService],
        imports: [ConfigModule],
        exports: [StorageService]
    })
], StorageModule);
export { StorageModule };
//# sourceMappingURL=storage.module.js.map