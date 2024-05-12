'use client' // Error components must be Client Components

import { Button } from '@/components/ui'
import { Color } from 'global/colors'
import type { FunctionType } from 'global/types'
import { NothingFound } from 'illustrations'
import { useEffect } from 'react'
//TODO: сделать с показом полной ошибки
const Error = ({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: FunctionType
}) => {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='mt-4 flex flex-1 items-center justify-start'>
			<div className='mx-auto items-center text-center'>
				<NothingFound className='mx-auto mb-2' width={200} height={180} />
				<h1 color={Color.gray}>
					Something went wrong, try refreshing the page
				</h1>
				<Button
					variant='muted'
					size={'md'}
					className='mx-auto mt-4'
					onClick={reset}>
					Try again
				</Button>
			</div>
		</div>
	)
}

export default Error
