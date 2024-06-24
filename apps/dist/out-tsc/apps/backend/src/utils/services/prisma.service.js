var PrismaService_1;
import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
let PrismaService = PrismaService_1 = class PrismaService extends PrismaClient {
    constructor() {
        super();
        if (!PrismaService_1.instance) {
            PrismaService_1.instance = this;
        }
        return PrismaService_1.instance;
    }
    async onModuleInit() {
        await this.$connect();
    }
};
PrismaService = PrismaService_1 = __decorate([
    Injectable()
    // inject config service here
    ,
    __metadata("design:paramtypes", [])
], PrismaService);
export { PrismaService };
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaService();
}
else {
    if (!global.prisma) {
        global.prisma = new PrismaService();
    }
    prisma = global.prisma;
}
export default prisma;
//# sourceMappingURL=prisma.service.js.map