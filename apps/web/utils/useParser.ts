import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ParserDtoPayload } from '../../../libs/global/services-types/parser-types'
import { parserService } from '../services/parser/parser-services'
import { successToast } from './toast'

export const useParser = () => {
  const QueryClient = useQueryClient()
  const { mutateAsync: parse, isLoading } = useMutation(
    ["parse good-reads books"],
    (dto: ParserDtoPayload) => parserService.parse(dto),
    {
      onSuccess: () => {
       successToast("Books parsed")
        QueryClient.invalidateQueries(["good-reads books"])
      }
    }
  )

  return {
    parse,
    isLoading
  }
}
