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
	ApiOkResponse,
	ApiParam,
	ApiTags
} from '@nestjs/swagger'
import { RoleType } from '../auth/auth.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { FilenameDto, UploadOutputDto } from './dto/upload.dto'
import { StorageService } from './storage.service'
import { StorageFolderType } from './storage.types'

@ApiTags('storage')
@ApiBearerAuth()
@Controller('storage')
@Auth()
export class StorageController {
	constructor(private readonly uploadService: StorageService) {}

	@Post('/delete')
	@ApiBody({ type: FilenameDto })
	@ApiOkResponse({ description: 'File deleted', type: null })
	async delete(@Body() dto: FilenameDto) {
		return this.uploadService.delete(dto.filename)
	}

	@Post('/:folder')
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiParam({
		name: 'folder',
		enum: ['ebooks', 'booksCovers']
	})
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
						maxSize: 10_000_000
					})
				]
			})
		)
		file: Express.Multer.File,
		@Param('folder') folder: StorageFolderType,
		@CurrentUser('role') role: RoleType
	): Promise<UploadOutputDto> {
		return this.uploadService.upload({
			file: file.buffer,
			filename: file.originalname,
			folder,
			role
		})
	}
}
