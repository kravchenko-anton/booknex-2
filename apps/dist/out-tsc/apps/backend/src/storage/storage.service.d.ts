/// <reference types="node" />
import type { EnvConfig } from '@/src/utils/config/env-config';
import { ConfigService } from '@nestjs/config';
import { type StorageFolderType } from 'global/helpers/storage-types';
export declare class StorageService {
    private readonly configService;
    constructor(configService: ConfigService<EnvConfig>);
    private readonly s3;
    upload({ file, fileName, folder }: {
        file: Buffer;
        fileName: string;
        folder: StorageFolderType;
    }): Promise<{
        name: string;
    }>;
}
