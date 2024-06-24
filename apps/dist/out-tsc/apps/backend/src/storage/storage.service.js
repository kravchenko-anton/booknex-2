var StorageService_1;
import { __decorate, __metadata } from "tslib";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { adminErrors, globalErrors } from 'global/errors';
import { StorageFolderArray, storageFolder } from 'global/helpers/storage-types';
import sharp from 'sharp';
import { serverError } from '../utils/helpers/server-error';
import { optimizeFilename } from '../utils/helpers/string.functions';
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new S3Client({
            endpoint: this.configService.get('AWS_ENDPOINT'),
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
            }
        });
    }
    async upload({ file, fileName, folder }) {
        if (!StorageFolderArray.includes(folder)) {
            throw serverError(HttpStatus.BAD_REQUEST, adminErrors.invalidFolder);
        }
        const optimizedFile = folder === storageFolder.ebooks || folder === storageFolder.imagesInBook
            ? file
            : await sharp(file)
                .resize({
                height: 1200,
                width: 800
            })
                .toFormat('jpeg', { progressive: true, quality: 50 })
                .toBuffer();
        const optimizedFileName = `${folder}/${Date.now() - Math.floor(Math.random() * 1000)}-${optimizeFilename(fileName)}`;
        await this.s3
            .send(new PutObjectCommand({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: optimizedFileName,
            Body: optimizedFile,
            ACL: 'public-read',
            ContentDisposition: 'inline'
        }))
            .catch(() => serverError(HttpStatus.BAD_REQUEST, globalErrors.invalidValue));
        Logger.log(`File ${optimizedFileName} uploaded to ${folder} folder`, StorageService_1.name);
        return {
            name: optimizedFileName
        };
    }
};
StorageService = StorageService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map