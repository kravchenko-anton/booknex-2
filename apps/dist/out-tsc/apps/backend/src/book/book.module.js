import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { PrismaService } from '../utils/services/prisma.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';
let BookModule = class BookModule {
};
BookModule = __decorate([
    Module({
        controllers: [BookController],
        providers: [BookService, PrismaService, StorageService],
        exports: [BookService]
    })
], BookModule);
export { BookModule };
//# sourceMappingURL=book.module.js.map