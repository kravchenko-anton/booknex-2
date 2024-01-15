import CallParse from '@/app/admin/parser/header/call-parse'
import { Button, Field } from '@/components/ui'
import { SheetHeader } from '@/components/ui/sheet'
import { useAction, useTypedSelector } from '@/hooks'
import { useSheetContext } from '@/providers/sheet-provider'
import { parserService } from '@/services/parser/parser-services'
import { successToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'
import type { ParserDtoPayload } from 'global/services-types/parser-types'
import { Search } from 'icons'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'

const Header = () => {
	const { showSheet, closeSheet } = useSheetContext()
	const router = useRouter()
	const { control, handleSubmit } = useForm<{ search: string }>({
		mode: 'onSubmit'
	})
	const { updateLastParsedData } = useAction()
	const { lastParsedData } = useTypedSelector(state => state.parser)
	const { mutateAsync: parse, isLoading: parseLoading } = useMutation(
		['parse good-reads books'],
		(dto: ParserDtoPayload) => parserService.parse(dto),
		{
			onSuccess: () => {
				successToast('Books parsed')
			}
		}
	)
	const onSubmit = data => {
		router.push(
			'/admin/parser' +
				'?' +
				new URLSearchParams({
					search: data.search
				})
		)
	}
	return (
		<div className=' flex w-full items-center justify-between  p-3'>
			<h1 className='text-3xl font-medium'>Parser</h1>
			<div className='flex gap-5'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						control={control}
						icon={Search}
						name='search'
						placeholder='Explore...'
						type='search'
					/>
				</form>
				<Button
					onClick={() =>
						showSheet(
							<div>
								<SheetHeader>
									<h1 className='text-3xl font-medium'>Parse </h1>
								</SheetHeader>
								<CallParse
									defaultValues={{
										link: lastParsedData?.url ?? '',
										page: (lastParsedData && lastParsedData.page + 1) ?? 0
									}}
									onSubmit={data => {
										parse({
											page: +data.page,
											url: data.link
										})
										updateLastParsedData({
											page: +data.page,
											url: data.link
										})
										closeSheet()
									}}
								/>
							</div>
						)
					}
					isLoading={parseLoading}
					size='sm'
					variant='primary'
				>
					Parsing
				</Button>
			</div>
		</div>
	)
}

export default Header
