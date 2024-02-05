import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import sharp from 'sharp'
import { RoleEnum, type RoleType } from '../auth/auth.service'
import { ErrorsEnum } from '../utils/errors'
import { optimizeFilename } from '../utils/string.functions'
import type { StorageFolderType } from './storage.types'
import { StorageFolderArray, StorageFolderEnum } from './storage.types'

@Injectable()
export class StorageService {
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
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
		try {
			await this.s3.send(
				new GetObjectCommand({
					Bucket: this.configService.get('AWS_BUCKET'),
					Key: filename
				})
			)
		} catch {
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
		}
		await this.s3
			.send(
				new DeleteObjectCommand({
					Bucket: this.configService.get('AWS_BUCKET'),
					Key: filename
				})
			)
			.catch(() => {
				throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
			})
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
			throw new BadRequestException(
				'You are not allowed to upload files'
			).getResponse()
		if (!StorageFolderArray.includes(folder)) {
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
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
			.catch(() => {
				throw new BadRequestException(ErrorsEnum.Unknow_Error).getResponse()
			})
		return {
			name: `${folder}/${optimizeFilename(filename)}`
		}
	}
}
