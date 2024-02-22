import { Controller, Get } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiProperty,
	ApiTags
} from '@nestjs/swagger'
import { Auth } from '../decorator/auth.decorator'
import { AdminService } from './admin.service'

export class statistics {
	@ApiProperty({
		description: 'Users count',
		type: Number
	})
	users: number
	@ApiProperty({
		description: 'Books count',
		type: Number
	})
	books: number
	@ApiProperty({
		description: 'Authors count',
		type: Number
	})
	authors: number
}
export class DashboardResponse {
	@ApiProperty({ type: statistics })
	statistics: statistics
}
@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}
	@Auth('admin')
	@Get('/dashboard')
	@ApiOkResponse({ type: DashboardResponse })
	async dashboard() {
		return this.adminService.dashboard()
	}
}
