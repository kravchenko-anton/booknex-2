import { useTypedNavigation } from '@/hooks'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { FunctionType } from 'global/types'
import { useRef, type Dispatch, type SetStateAction } from 'react'

interface UseModalReferenceProperties {
	onOpenModal: FunctionType
}
export const useModalReference = (
	setReaderUiVisible: Dispatch<SetStateAction<boolean>>,
	{ onOpenModal }: UseModalReferenceProperties
) => {
	const { addListener } = useTypedNavigation()

	const chaptersListModalReference = useRef<BottomSheetModal>(null)
	const readingSettingsModalReference = useRef<BottomSheetModal>(null)
	// closing all modals when leaving the screen
	const unsubscribe = addListener('beforeRemove', () => {
		setReaderUiVisible(false)
		readingSettingsModalReference.current?.close()
		chaptersListModalReference.current?.close()

		return () => unsubscribe()
	})

	return {
		modalRefs: {
			chaptersListModalReference,
			readingSettingsModalReference
		},
		openModal: {
			chaptersList: () => {
				chaptersListModalReference.current?.present()
				onOpenModal()
			},
			readingSettings: () => {
				readingSettingsModalReference.current?.present()
				onOpenModal()
			}
		}
	}
}
