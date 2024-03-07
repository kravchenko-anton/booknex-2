import type { UpdateGenreDtoType } from '@/app/admin/book/_shared/validation/update.genre.dto'
import { Button } from '@/components/ui'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import api from '@/services'
import { cn } from '@/utils'
import { errorToast } from '@/utils/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { Check } from 'icons'
import * as React from 'react'
import { useState, type FC } from 'react'

interface UpdateGenresProperties {
	bookId: number
	defaultGenres?: number[]
}

const UpdateGenres: FC<UpdateGenresProperties> = ({
	defaultGenres = [],
	bookId,
	...properties
}) => {
	const { data: genres = [] } = useQuery({
		queryKey: ['genres'],
		queryFn: () => api.genre.all(),
		select: data => data.data
	})
	const [selectedGenres, setSelectedGenres] = useState<number[]>(defaultGenres)
	const { mutateAsync: updateGenre, isLoading: updateGenreLoading } =
		useMutation({
			mutationKey: ['update-genre'],
			mutationFn: ({
				id,
				payload
			}: {
				id: number
				payload: UpdateGenreDtoType
			}) => api.book.updateGenre(id, payload),
			onError: () => errorToast('Error while uploading book')
		})

	console.log('SelectGenres', { selectedGenres, defaultGenres })
	return (
		<>
			<h1 className='my-2 text-xl'>Genres</h1>
			<div className='flex items-center gap-2 text-left'>
				<div>
					<Popover>
						<PopoverTrigger className='w-full'>
							<div
								className={cn(
									'border-bordered bg-foreground h-full rounded-lg border-2 px-4 py-2'
								)}
								{...properties}
							>
								<span className='flex flex-wrap gap-2'>
									Selected genres ({selectedGenres.length})
								</span>
							</div>
						</PopoverTrigger>
						<PopoverContent className='p-0'>
							<Command>
								<CommandInput placeholder='Search genre...' />
								<CommandEmpty>No genre found.</CommandEmpty>
								<CommandGroup>
									{genres.map(genre => (
										<CommandItem
											key={genre.id}
											value={genre.name}
											onSelect={() =>
												setSelectedGenres(
													selectedGenres.includes(genre.id)
														? selectedGenres.filter(
																(selectedGenre: number) =>
																	selectedGenre !== genre.id
															)
														: [...selectedGenres, genre.id]
												)
											}
										>
											<Check
												color={Color.white}
												className={cn(
													'mr-2 h-4 w-4',
													Boolean(selectedGenres.includes(genre.id))
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{genre.name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
				<Button
					size={'md'}
					isLoading={updateGenreLoading}
					variant='muted'
					disabled={
						JSON.stringify(selectedGenres) === JSON.stringify(defaultGenres)
					}
					onClick={async () => {
						await updateGenre({
							id: bookId,
							payload: {
								genres: selectedGenres
							}
						})
					}}
				>
					Edit
				</Button>
			</div>
		</>
	)
}

export default UpdateGenres
