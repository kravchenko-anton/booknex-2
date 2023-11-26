import type { StatisticsOutput } from '@/shared-types/admin-types'
import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Auth } from '../decorator/auth.decorator'
import { AdminService } from './admin.service'

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}
	@Auth('admin')
	@Get('/statistics')
	async statistics(): Promise<StatisticsOutput> {
		return this.adminService.statistics()
	}
}
