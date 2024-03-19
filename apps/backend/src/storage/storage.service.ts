import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Role } from '@prisma/client'
import sharp from 'sharp'
import { AdminErrors, GlobalErrorsEnum } from '../../../../libs/global/errors'
import type { RoleType } from '../auth/auth.service'
import type { EnvironmentType } from '../utils/common/environment.config'
import { serverError } from '../utils/helpers/call-error'
import { optimizeFilename } from '../utils/helpers/string.functions'
import {
	StorageFolderArray,
	StorageFolderEnum,
	type StorageFolderType
} from './storage.types'

@Injectable()
export class StorageService {
	constructor(private readonly configService: ConfigService<EnvironmentType>) {}
	private readonly s3 = new S3Client({
		endpoint: this.configService.get('AWS_ENDPOINT'),
		region: this.configService.get('AWS_REGION'),
		credentials: {
			accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
			secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
		}
	})

	async upload({
		file,
		filename,
		folder,
		role
	}: {
		file: Buffer
		filename: string
		folder: StorageFolderType
		role: RoleType
	}) {
		if (!(role === Role.admin))
			throw serverError(HttpStatus.FORBIDDEN, AdminErrors.notEnoughRights)
		if (!StorageFolderArray.includes(folder)) {
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.invalidFolder)
		}
		const finalFile =
			folder === StorageFolderEnum.ebooks
				? file
				: await sharp(file)
						.resize({
							height: 1200,
							width: 800
						})

						.toFormat('jpeg', { progressive: true, quality: 50 })
						.toBuffer()
		await this.s3
			.send(
				new PutObjectCommand({
					Bucket: this.configService.get('AWS_BUCKET'),
					Key: `${folder}/${optimizeFilename(filename)}`,
					Body: finalFile,
					ACL: 'public-read',
					ContentDisposition: 'inline'
				})
			)
			.catch(() =>
				serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.invalidValue)
			)
		Logger.log(
			`File ${filename} uploaded to ${folder} folder`,
			StorageService.name
		)
		return {
			name: `${folder}/${optimizeFilename(filename)}`
		}
	}
}
