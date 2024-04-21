import type { EnvConfig } from '@/src/utils/config/env-config'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { adminErrors, globalErrors } from 'global/errors'
import {
	StorageFolderArray,
	storageFolder,
	type StorageFolderType
} from 'global/helpers/storage-types'
import sharp from 'sharp'
import { serverError } from '../utils/helpers/server-error'
import { optimizeFilename } from '../utils/helpers/string.functions'

@Injectable()
export class StorageService {
	constructor(private readonly configService: ConfigService<EnvConfig>) {}
	private readonly s3 = new S3Client({
		endpoint: this.configService.get('AWS_ENDPOINT'),
		region: this.configService.get('AWS_REGION'),
		credentials: {
			accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') as string,
			secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') as string
		}
	})

	async upload({
		file,
		fileName,
		folder
	}: {
		file: Buffer
		fileName: string
		folder: StorageFolderType
	}) {
		if (!StorageFolderArray.includes(folder)) {
			throw serverError(HttpStatus.BAD_REQUEST, adminErrors.invalidFolder)
		}
		const optimizedFile =
			folder === storageFolder.ebooks
				? file
				: await sharp(file)
						.resize({
							height: 1200,
							width: 800
						})

						.toFormat('jpeg', { progressive: true, quality: 50 })
						.toBuffer()

		const optimizedFileName = `${folder}/${
			Date.now() - Math.floor(Math.random() * 1000)
		}-${optimizeFilename(fileName)}`
		await this.s3
			.send(
				new PutObjectCommand({
					Bucket: this.configService.get('AWS_BUCKET'),
					Key: optimizedFileName,
					Body: optimizedFile,
					ACL: 'public-read',
					ContentDisposition: 'inline'
				})
			)
			.catch(() =>
				serverError(HttpStatus.BAD_REQUEST, globalErrors.invalidValue)
			)
		Logger.log(
			`File ${optimizedFileName} uploaded to ${folder} folder`,
			StorageService.name
		)
		return {
			name: optimizedFileName
		}
	}
}
