import CreateAuthor from '@/app/admin/authors/create/create'
import { useSheetContext } from '@/providers/sheet-provider'

export const useCreateButton = () => {
	const { showSheet, closeSheet } = useSheetContext()
	const createAuthor = () =>
		showSheet(
			<CreateAuthor
				onCreate={() => {
					closeSheet()
				}}
			/>
		)

	return {
		createAuthor
	}
}
