import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { PrismaService } from '../utils/services/prisma.service';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
let GenreModule = class GenreModule {
};
GenreModule = __decorate([
    Module({
        controllers: [GenreController],
        providers: [GenreService, PrismaService],
        exports: [GenreService]
    })
], GenreModule);
export { GenreModule };
//# sourceMappingURL=genre.module.js.map