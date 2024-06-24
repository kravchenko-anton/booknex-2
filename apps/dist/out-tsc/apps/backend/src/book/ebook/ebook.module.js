import { __decorate } from "tslib";
import { StorageService } from '@/src/storage/storage.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../utils/services/prisma.service';
import { EbookController } from './ebook.controller';
import { EbookService } from './ebook.service';
let EbookModule = class EbookModule {
};
EbookModule = __decorate([
    Module({
        controllers: [EbookController],
        providers: [EbookService, PrismaService, StorageService]
    })
], EbookModule);
export { EbookModule };
//# sourceMappingURL=ebook.module.js.map