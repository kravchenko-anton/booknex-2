import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'

class ActivityItem {
	@ApiProperty({
		description: 'Activity message',
		example: 'startedReading'
	})
	@IsString()
	message: string

	@ApiProperty({
		description: 'Active time',
		example: '2021-07-01T10:00:00'
	})
	@IsString()
	time: string

	@ApiProperty({
		description: 'Activity importance',
		example: 1
	})
	@IsNumber()
	importance: number
}

export class Activity {
	@ApiProperty({
		description: 'Active date',
		example: '2021-07-01'
	})
	@IsString()
	date: string

	@ApiProperty({
		description: 'Active count',
		example: 10
	})
	@IsNumber()
	count: number

	@ApiProperty({
		description: 'Active level',
		example: 10
	})
	@IsNumber()
	level: number

	@ApiProperty({
		type: [ActivityItem],
		description: 'List of activities'
	})
	@IsArray()
	@ValidateNested({ each: true })
	activities: ActivityItem[]
}
