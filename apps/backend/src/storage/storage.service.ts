import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Role } from '@prisma/client'
import sharp from 'sharp'
import { AdminErrors, GlobalErrorsEnum } from '../../../../libs/global/errors'
import type { RoleType } from '../auth/auth.service'
import { serverError } from '../utils/helpers/call-error'
import type { EnvironmentType } from '../utils/helpers/environment-types.ts'
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
			return
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
		console.log(filename, 'delete')
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
		if (!(role === Role.admin))
			throw serverError(HttpStatus.FORBIDDEN, AdminErrors.notEnoughRights)
		if (!StorageFolderArray.includes(folder)) {
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.invalidFolder)
		}
		await this.delete(`${folder}/${optimizeFilename(filename)}`)
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
		console.log('success upload picture')
		return {
			name: `${folder}/${optimizeFilename(filename)}`
		}
	}
}
