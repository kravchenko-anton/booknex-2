import CallParserDialog from '@/app/admin/parser/parse-template/parse-template'
import { Button } from '@/components/ui'
import type { DialogProperties } from '@/components/ui/base-components-types'
import api from '@/services/api'
import { successToast } from '@/utils/toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ParserDto } from 'global/api-client'
import type { FunctionType } from 'global/types'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import type { FC } from 'react'

interface ParseButtonProperties extends DialogProperties {
	openParserDialog?: FunctionType
}
const ParseButton: FC<ParseButtonProperties> = properties => {
	const queryClient = useQueryClient()

	const { mutateAsync: parse, isPending: parseLoading } = useMutation({
		mutationKey: MutationKeys.bookTemplate.parse,
		mutationFn: (dto: ParserDto) => api.parser.parse(dto),
		onSuccess: async () => {
			successToast('Books parsed')
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.bookTemplate.catalog.key
			})
		}
	})
	return (
		<>
			<Button
				isLoading={parseLoading}
				size='sm'
				variant='muted'
				onClick={properties.openParserDialog}>
				Parsing
			</Button>

			<CallParserDialog
				isOpen={properties.isOpen}
				parseLoading={parseLoading}
				onClose={properties.onClose}
				onSubmit={async data => {
					await parse({
						page: +data.page,
						url: data.url
					})
					window.localStorage.setItem(
						'lastParsedData',

						JSON.stringify({
							url: data.url,
							page: +data.page
						})
					)
				}}
			/>
		</>
	)
}

export default ParseButton
