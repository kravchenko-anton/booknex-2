export type ChapterType = {
	name: string
	children: {
		name: string
		link: string
	}[]
}

declare global {
	namespace PrismaJson {
		type Chapter = ChapterType
	}
}
