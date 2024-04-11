import { PrismaClient } from '@/prisma/generated'
import type { OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

declare global {
	var prisma: PrismaService | null // eslint-disable-line no-var
}

@Injectable()
// inject config service here
export class PrismaService extends PrismaClient implements OnModuleInit {
	private static instance: PrismaService

	constructor() {
		super()
		if (!PrismaService.instance) {
			PrismaService.instance = this
		}

		return PrismaService.instance
	}

	async onModuleInit() {
		await this.$connect()
	}
}

let prisma: PrismaService

if (process.env['NODE_ENV'] === 'production') {
	prisma = new PrismaService()
} else {
	if (!global.prisma) {
		global.prisma = new PrismaService()
	}

	prisma = global.prisma
}

export default prisma
