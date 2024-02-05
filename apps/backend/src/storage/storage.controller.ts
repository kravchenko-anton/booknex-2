import {
	Body,
	Controller,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiParam,
	ApiTags
} from '@nestjs/swagger'
import type { UploadOutput } from '../../../../libs/global/services-types/storage-types'
import { RoleType } from '../auth/auth.service'
import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'
import { FilenameDto, ReplacementDto } from './dto/upload.dto'
import { StorageService } from './storage.service'
import { StorageFolderEnum, StorageFolderType } from './storage.types'

@ApiTags('storage')
@ApiBearerAuth()
@Controller('storage')
export class StorageController {
	constructor(private readonly uploadService: StorageService) {}

	@Auth()
	@Post('/delete')
	@ApiBody({ type: FilenameDto })
	async delete(@Body() dto: FilenameDto) {
		return this.uploadService.delete(dto.filename)
	}

	@Auth()
	@Post('/replacement')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				},
				deleteFilename: {
					type: 'string'
				}
			}
		}
	})
	@UseInterceptors(FileInterceptor('file'))
	async replacement(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 10_000_000
					})
				]
			})
		)
		file: Express.Multer.File,
		@CurrentUser('role') role: RoleType,
		@Body() dto: ReplacementDto
	) {
		await this.uploadService.delete(dto.deleteFilename)

		return this.uploadService.upload({
			file: file.buffer,
			filename: file.originalname,
			folder: dto.folder,
			role
		})
	}

	@Post('/:folder')
	@Auth()
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@ApiParam({ name: 'folder', enum: StorageFolderEnum })
	async upload(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 10_000_000
					})
				]
			})
		)
		file: Express.Multer.File,
		@Param('folder') folder: StorageFolderType,
		@CurrentUser('role') role: RoleType
	): Promise<UploadOutput> {
		return this.uploadService.upload({
			file: file.buffer,
			filename: file.originalname,
			folder,
			role
		})
	}
}
