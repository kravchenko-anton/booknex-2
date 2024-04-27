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
import api from '@/services/api'
import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import type { ShortGenre } from 'global/api-client'
import { Color } from 'global/colors'
import type { BaseFieldProperties } from 'global/types'
import { QueryKeys } from 'global/utils/query-keys'
import { Check } from 'icons'

import { Controller } from 'react-hook-form'

const SelectGenres = <T extends Record<string, any>>({
	control,
	name,
	...properties
}: BaseFieldProperties<T>) => {
	const { data: genres = [] } = useQuery({
		queryKey: QueryKeys.genres.key,
		queryFn: () => api.genre.catalog(),
		select: data => data.data
	})
	console.log('genres', genres)
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { value = [] as ShortGenre[], onChange: setGenre },
				fieldState: { error }
			}) => (
				<>
					<div>
						<Popover>
							<PopoverTrigger className='w-full'>
								<div
									className={cn(
										'border-bordered bg-foreground  rounded border-[1px] px-2 py-1'
									)}
									{...properties}>
									<div className='flex max-w-xl flex-nowrap gap-2 overflow-hidden'>
										{value.length > 0
											? value
													.map(({ slug }) => (
														<span key={slug}>
															{genres.find(genre => genre.slug === slug)?.name}
														</span>
													))
													.slice(0, 2)
											: 'No genre selected'}{' '}
										{value.length - 2 > 0 && `(${value.length - 2})`}
									</div>
								</div>
							</PopoverTrigger>

							<PopoverContent className=' p-0'>
								<Command>
									<CommandInput placeholder='Search genre...' />
									<CommandEmpty>No genre found.</CommandEmpty>
									<CommandGroup>
										{genres.map(genre => (
											<CommandItem
												key={genre.slug}
												value={genre.name}
												onSelect={() =>
													setGenre(
														value.some(({ slug }) => slug === genre.slug)
															? value.filter(({ slug }) => slug !== genre.slug)
															: [...value, genre]
													)
												}>
												<Check
													color={Color.white}
													className={cn(
														'mr-2 h-4 w-4',
														Boolean(
															value.some(({ slug }) => slug === genre.slug)
														)
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
