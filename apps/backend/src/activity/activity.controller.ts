import { Body, Controller, Post } from '@nestjs/common'
import { Auth } from '../decorator/auth.decorator'
import { ActivityService } from './activity.service'
import { CreateActivityDto } from './dto/create-activity.dto'

@Controller('activity')
export class ActivityController {
	constructor(private readonly activityService: ActivityService) {}

	@Auth('admin')
	@Post('/create')
	create(@Body() properties: CreateActivityDto) {
		return this.activityService.create(properties)
	}
}
