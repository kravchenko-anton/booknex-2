import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import sharp from 'sharp'
import { RoleEnum, type RoleType } from '../auth/auth.service'
import { serverError } from '../utils/call-error'
import { AdminErrors, GlobalErrorsEnum } from '../utils/errors'
import { optimizeFilename } from '../utils/string.functions'
import type { StorageFolderType } from './storage.types'
import { StorageFolderArray, StorageFolderEnum } from './storage.types'

@Injectable()
export class StorageService {
	//TODO: переделать везде на configService и сделать типизацию env файла по всему проекту   и в мобилке и в web
	//@ts-ignore
	private readonly s3 = new S3Client({
		endpoint: process.env.AWS_ENDPOINT,
		region: process.env.AWS_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
		}
	})

	constructor(private readonly configService: ConfigService) {}

	async delete(filename: string) {
		if (!filename)
			serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.invalidValue)
		try {
			await this.s3.send(
				new GetObjectCommand({
					Bucket: this.configService.get('AWS_BUCKET'),
					Key: filename
				})
			)
		} catch {
			serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.invalidValue)
		}
		await this.s3
			.send(
				new DeleteObjectCommand({
					Bucket: this.configService.get('AWS_BUCKET'),
					Key: filename
				})
			)
			.catch(() =>
				serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.invalidValue)
			)
	}

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
		if (!(role === RoleEnum.ADMIN))
			return serverError(HttpStatus.FORBIDDEN, AdminErrors.notEnoughRights)
		if (!StorageFolderArray.includes(folder)) {
			return serverError(HttpStatus.BAD_REQUEST, AdminErrors.invalidFolder)
		}
		console.log('file', file)
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
		return {
			name: `${folder}/${optimizeFilename(filename)}`
		}
	}
}
