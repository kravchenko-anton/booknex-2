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
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { Check } from 'icons'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'

interface SelectGenresProperties {
	disable?: boolean
	defaultValue?: number[]
	control: any
}

const SelectGenres: FC<SelectGenresProperties> = ({
	disable = false,
	defaultValue = [],
	control,
	...properties
}) => {
	const { data: genres = [] } = useQuery({
		queryKey: ['genres'],
		queryFn: () => api.genre.all(),
		select: data => data.data
	})

	return (
		//TODO: сделать через filedArray
		<Controller
			control={control}
			name='genres'
			defaultValue={defaultValue}
			render={({
				field: { value = [], onChange: setGenre },
				fieldState: { error }
			}) => (
				<>
					<div>
						<Popover>
							<PopoverTrigger className='w-full'>
								<div
									className={cn(
										'border-muted h-full rounded-xl border-2 px-4 py-3',
										disable && 'cursor-not-allowed'
									)}
									{...properties}
								>
									<span className='flex flex-wrap gap-2'>
										Selected genres ({value.length})
									</span>
								</div>
							</PopoverTrigger>
							<PopoverContent className=' p-0'>
								<Command>
									<CommandInput placeholder='Search genre...' />
									<CommandEmpty>No genre found.</CommandEmpty>
									<CommandGroup>
										{genres.map(genre => (
											<CommandItem
												key={genre.id}
												value={genre.name}
												onSelect={() =>
													setGenre(
														value.includes(genre.id)
															? value.filter(
																	(selectedGenre: number) =>
																		selectedGenre !== genre.id
																)
															: [...value, genre.id]
													)
												}
											>
												<Check
													color={Color.white}
													className={cn(
														'mr-2 h-4 w-4',
														Boolean(value.includes(genre.id))
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
					{!!error && (
						<p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>
					)}
				</>
			)}
		/>
	)
}

export default SelectGenres
