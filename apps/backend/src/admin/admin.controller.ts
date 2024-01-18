import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type { StatisticsOutput } from '../../../../libs/global/services-types/admin-types'
import { Auth } from '../decorator/auth.decorator'
import { AdminService } from './admin.service'

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}
	@Auth('admin')
	@Get('/dashboard')
	async dashboard(): Promise<StatisticsOutput> {
		return this.adminService.dashboard()
	}
}
