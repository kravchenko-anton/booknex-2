import type { ChapterType } from 'backend/types'
import { useState } from 'react'

export const useChapters = () => {
	const [chapters, setChapters] = useState<ChapterType[]>([])
	const updateBookName = ({ name, value }: { name: string; value: string }) => {
		setChapters(
			chapters.map(chapter => {
				if (chapter.name === name) {
					chapter.name = value
				}
				return chapter
			})
		)
	}

	const updateChapterName = ({
		name,
		link,
		value
	}: {
		name: string
		link: string
		value: string
	}) => {
		setChapters(
			chapters.map(chapter => {
				if (chapter.name === name) {
					chapter.children = chapter.children?.map(childMap => {
						if (childMap.link === link) {
							childMap.name = value
						}
						return childMap
					})
				}
				return chapter
			})
		)
	}

	const removeChapter = ({ name, link }: { name: string; link: string }) => {
		setChapters(
			chapters.map(chapterMap => {
				if (chapterMap.name === name) {
					chapterMap.children = chapterMap.children?.filter(
						childMap => childMap.link !== link
					)
				}
				return chapterMap
			})
		)
	}

	return {
		chapters: {
			state: chapters,
			updateBookName,
			setChapters,
			updateChapterName,
			removeChapter
		}
	}
}
