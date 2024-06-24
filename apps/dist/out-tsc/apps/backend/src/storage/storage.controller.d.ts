/// <reference types="multer" />
import * as storageTypes from 'global/helpers/storage-types';
import { UploadOutputDto } from './storage.dto';
import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly uploadService;
    constructor(uploadService: StorageService);
    upload(file: Express.Multer.File, folder: storageTypes.StorageFolderType): Promise<UploadOutputDto>;
}
