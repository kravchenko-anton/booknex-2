import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { PrismaService } from '../utils/services/prisma.service';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
let ParserModule = class ParserModule {
};
ParserModule = __decorate([
    Module({
        controllers: [ParserController],
        providers: [ParserService, PrismaService]
    })
], ParserModule);
export { ParserModule };
//# sourceMappingURL=parser.module.js.map