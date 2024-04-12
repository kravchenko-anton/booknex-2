import { useTypedNavigation } from '@/hooks'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'

export const useReaderModal = (
	setReaderUiVisible: React.Dispatch<React.SetStateAction<boolean>>
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
		chaptersListModalReference,
		readingSettingsModalReference
	}
}
