import type { CreateBookDto } from 'global/api-client'
// we need upload picture, dto from backend need string and it why i create new type
export type CreateBookType = Omit<CreateBookDto, 'picture'> & {
	picture: File
}
