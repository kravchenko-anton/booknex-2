'use client'

import * as React from 'react'
import { Pie, PieChart } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

export const HtmlInfoChart = ({
	data
}: {
	data: {
		name: string
		value: unknown
	}[]
}) => (
	<Card className='flex flex-col'>
		<CardHeader className='items-center pb-0'>
			<CardTitle>
				HTML Elements <span className='text-muted-foreground'>(by count)</span>
			</CardTitle>
			<CardDescription>
				Shows the count of HTML elements used in the document
			</CardDescription>
		</CardHeader>
		<CardContent className='flex-1 pb-0'>
			<ChartContainer
				className='mx-auto aspect-square max-h-[250px]'
				config={{}}>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={data}
						dataKey='value'
						nameKey='name'
						innerRadius={60}
						strokeWidth={5}
					/>
				</PieChart>
			</ChartContainer>
		</CardContent>
	</Card>
)
