import { genreService } from '@/shared/services/genre/genre-service'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from '@/shared/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { cn } from '@/shared/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { Check } from 'icons'
import type { FC } from 'react'

interface SelectGenresProperties {
	selectedGenres: number[]
	setSelectedGenres: (genres: number[]) => void
}

const SelectGenres: FC<SelectGenresProperties> = ({
	selectedGenres,
	setSelectedGenres
}) => {
	const { data: genres = [] } = useQuery({
		queryKey: ['genres'],
		queryFn: () => genreService.all()
	})

	const onGenreSelect = (id: number) => {
		if (selectedGenres.includes(id))
			return setSelectedGenres(
				selectedGenres.filter(selectedGenre => selectedGenre !== id)
			)
		setSelectedGenres([...selectedGenres, id])
	}
	return (
		<div>
			<h1 className='mb-2 mt-4 flex gap-5'>
				Genres <p className='text-gray'>First genre be main</p>
			</h1>
			<Popover>
				<PopoverTrigger className='w-full'>
					<div className='border-muted rounded-xl border-2 p-2'>
						<span className='flex flex-wrap gap-2'>
							Selected genres ({selectedGenres.length})
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
									onSelect={() => onGenreSelect(genre.id)}
								>
									<Check
										color={Color.white}
										className={cn(
											'mr-2 h-4 w-4',
											selectedGenres.includes(genre.id)
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
	)
}

export default SelectGenres
