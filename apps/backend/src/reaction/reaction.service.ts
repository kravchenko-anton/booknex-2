import { Injectable } from '@nestjs/common'

@Injectable()
export class ReactionService {
	create(createReactionDto: any) {
		return 'This action adds a new reaction'
	}

	findAll() {
		return `This action returns all reaction`
	}

	findOne(id: number) {
		return `This action returns a #${id} reaction`
	}

	update(id: number, updateReactionDto: any) {
		return `This action updates a #${id} reaction`
	}

	remove(id: number) {
		return `This action removes a #${id} reaction`
	}
}
