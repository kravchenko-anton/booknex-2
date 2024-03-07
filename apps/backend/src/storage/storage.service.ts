import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Role } from '@prisma/client'
import * as fs from 'node:fs'
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

	async delete(filename: string) {
		if (!filename)
			serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.invalidValue)
		try {
			fs.accessSync(this.configService.get('UPLOAD_DIR') + filename)
		} catch {
			return
		}
		fs.unlinkSync(this.configService.get('UPLOAD_DIR') + filename)
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
		console.log(folder === StorageFolderEnum.ebooks)
		console.log(folder)
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
		fs.writeFileSync(
			this.configService.get('UPLOAD_DIR') +
				`${folder}/${optimizeFilename(filename)}`,
			finalFile
		)
		console.log('success upload picture')
		return {
			name: `${folder}/${optimizeFilename(filename)}`
		}
	}
}
