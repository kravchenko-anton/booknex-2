import {
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
	ApiOkResponse,
	ApiParam,
	ApiTags
} from '@nestjs/swagger'
import type { StorageFolderType } from 'global/helpers/storage-types'
import { StorageFolderArray } from 'global/helpers/storage-types'
import { Auth } from '../auth/decorators/auth.decorator'
import environment from '../utils/common/environment.config'
import { UploadOutputDto } from './dto/upload.dto'
import { StorageService } from './storage.service'

@ApiTags('storage')
@ApiBearerAuth()
@Controller('storage')
@Auth('admin')
export class StorageController {
	constructor(private readonly uploadService: StorageService) {}

	@Post('/:folder')
	@ApiParam({
		name: 'folder',
		enum: StorageFolderArray
	})
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
	@ApiOkResponse({ description: 'File uploaded', type: UploadOutputDto })
	async upload(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: environment.MAX_UPLOAD_SIZE
					})
				]
			})
		)
		file: Express.Multer.File,
		@Param('folder') folder: StorageFolderType
	): Promise<UploadOutputDto> {
		return this.uploadService.upload({
			file: file.buffer,
			fileName: file.originalname,
			folder
		})
	}
}
