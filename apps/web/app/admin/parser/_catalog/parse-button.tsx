import CallParserDialog from '@/app/admin/parser/_catalog/dialogs/call-parser'
import { Button } from '@/components/ui'
import type { DialogProperties } from '@/components/ui/base-components-types'
import api from '@/services'
import { successToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ParserDto } from 'global/api-client'
import type { FunctionType } from 'global/types'
import type { FC } from 'react'

interface ParseButtonProperties extends DialogProperties {
	openParserDialog?: FunctionType
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
		mutationKey: ['parse-templates'],
		mutationFn: (dto: ParserDto) => api.parser.parse(dto),
		onSuccess: async () => {
			successToast('Books parsed')
			await queryClient.invalidateQueries({
				queryKey: ['book-templates']
			})
		}
	})
	return (
		<>
			<Button
				isLoading={parseLoading}
				size='sm'
				variant='primary'
				onClick={properties.openParserDialog}
			>
				Parsing
			</Button>

			<CallParserDialog
				isOpen={properties.isOpen}
				defaultValues={{
					link: lastParsedData?.url ?? '',
					page: (lastParsedData && lastParsedData.page + 1) ?? 0
				}}
				onClose={properties.onClose}
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
