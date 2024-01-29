import CallParserDialog from '@/features/parser/catalog/dialogs/call-parser'
import { parserService } from '@/shared/services/parser/parser-services'
import type { DialogProperties } from '@/shared/types/global'
import { Button } from '@/shared/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ParserDtoPayload } from 'global/services-types/parser-types'
import type { FC } from 'react'
import { toast } from 'sonner'

interface ParseButtonProperties extends DialogProperties {
	openParserDialog?: () => void
}

type LastParsedData = {
	url: string
	page: number
} | null

const ParseButton: FC<ParseButtonProperties> = properties => {
	const queryClient = useQueryClient()
	const lastParsedData: LastParsedData = window.localStorage.getItem(
		'lastParsedData'
	)
		? JSON.parse(window.localStorage.getItem('lastParsedData') ?? '')
		: null

	const { mutateAsync: parse, isLoading: parseLoading } = useMutation({
		mutationKey: ['parse book-templates'],
		mutationFn: (dto: ParserDtoPayload) => parserService.parse(dto),
		onSuccess: async () => {
			toast.success('Books parsed')
			await queryClient.invalidateQueries(['book-templates'])
		}
	})
	return (
		<>
			<Button
				onClick={properties.openParserDialog}
				isLoading={parseLoading}
				size='sm'
				variant='primary'
			>
				Parsing
			</Button>

			<CallParserDialog
				isOpen={properties.isOpen}
				onClose={properties.onClose}
				defaultValues={{
					link: lastParsedData?.url ?? '',
					page: (lastParsedData && lastParsedData.page + 1) ?? 0
				}}
				onSubmit={async data => {
					await parse({
						page: +data.page,
						url: data.link
					})
					window.localStorage.setItem(
						'lastParsedData',
						JSON.stringify({
							url: data.link,
							page: +data.page
						})
					)
				}}
			/>
		</>
	)
}

export default ParseButton
