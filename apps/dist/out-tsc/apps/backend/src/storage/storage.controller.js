import { __decorate, __metadata, __param } from "tslib";
import { Controller, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import * as storageTypes from 'global/helpers/storage-types';
import { Auth } from '../auth/decorators/auth.decorator';
import { UploadOutputDto } from './storage.dto';
import { StorageService } from './storage.service';
let StorageController = class StorageController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async upload(file, folder) {
        return this.uploadService.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder
        });
    }
};
__decorate([
    Post('/:folder'),
    ApiParam({
        name: 'folder',
        enum: storageTypes.StorageFolderArray
    }),
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    ApiOkResponse({ description: 'File uploaded', type: UploadOutputDto }),
    __param(0, UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: Number(process.env.MAX_UPLOAD_SIZE)
            })
        ]
    }))),
    __param(1, Param('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "upload", null);
StorageController = __decorate([
    ApiTags('storage'),
    ApiBearerAuth(),
    Controller('storage'),
    Auth('admin'),
    __metadata("design:paramtypes", [StorageService])
], StorageController);
export { StorageController };
//# sourceMappingURL=storage.controller.js.map