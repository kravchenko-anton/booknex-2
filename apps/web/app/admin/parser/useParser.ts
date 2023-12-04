import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { ParserDtoPayload } from '../../../../../libs/global/services-types/parser-types'
import { useDebounce } from '../../../../mobile/src/hooks/useDebounce'
import { useAction } from '../../../hooks/useAction'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { parserService } from '../../../services/parser/parser-services'
import { successToast } from '../../../utils/toast'

export const useParser = () => {
	const { showPopup, closePopup, updateLastParsedData } = useAction()
	const { lastParsedData } = useTypedSelector(state => state.parser)
	const { control, watch } = useForm()
	const QueryClient = useQueryClient()
	const { mutateAsync: parse, isLoading: parseLoading } = useMutation(
		['parse good-reads books'],
		(dto: ParserDtoPayload) => parserService.parse(dto),
		{
			onSuccess: () => {
				successToast('Books parsed')
				QueryClient.invalidateQueries(['good-reads books'])
			}
		}
	)
	const search = useDebounce(watch('search'), 500)
	const { mutateAsync: deleteFromParser } = useMutation(
		['delete from parser'],
		(id: number) => parserService.delete(id),
		{
			onSuccess: () => {
				successToast('Book deleted')
				QueryClient.invalidateQueries(['good-reads books'])
			}
		}
	)
	const { data: goodReadsBooks, isLoading: goodReadsLoading } = useQuery(
		['good-reads books' + (search || '')],
		() => parserService.all(search)
	)

	return {
		parse,
		parseLoading,
		deleteFromParser,
		goodReadsBooks,
		goodReadsLoading,
		control,
		showPopup,
		lastParsedData,
		updateLastParsedData,
		closePopup
	}
}
