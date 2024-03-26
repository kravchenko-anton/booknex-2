import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import api from '@/services/api';
import { cn } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Color } from 'global/colors';
import { Check } from 'icons';
import type { FC } from 'react';

import { Controller, type Control } from 'react-hook-form';

interface SelectGenresProperties {
  disable?: boolean;
  control: Control<any>;
}

const SelectGenres: FC<SelectGenresProperties> = ({ disable = false, control, ...properties }) => {
  const { data: genres = [] } = useQuery({
    queryKey: ['genres'],
    queryFn: () => api.genre.catalog(),
    select: (data) => data.data
  });

  return (
    <Controller
      control={control}
      name='genres'
      render={({ field: { value = [], onChange: setGenre }, fieldState: { error } }) => {
        const selectGenreText =
          value.length > 0
            ? value
                .map((selectedGenre: number) => (
                  <span key={selectedGenre}>
                    {genres.find((genre) => genre.id === selectedGenre)?.name}
                  </span>
                ))
                .slice(0, 2)
            : 'No genre selected';
        return (
          <>
            <div>
              <Popover>
                <PopoverTrigger className='w-full'>
                  <div
                    className={cn(
                      'border-bordered bg-foreground  rounded border-[1px] px-2 py-1',

                      disable && 'cursor-not-allowed'
                    )}
                    {...properties}
                  >
                    <div className='flex max-w-xl flex-nowrap gap-2 overflow-hidden'>
                      {selectGenreText} {value.length - 2 > 0 && `(${value.length - 2})`}
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent className=' p-0'>
                  <Command>
                    <CommandInput placeholder='Search genre...' />
                    <CommandEmpty>No genre found.</CommandEmpty>
                    <CommandGroup>
                      {genres.map((genre) => (
                        <CommandItem
                          key={genre.id}
                          value={genre.name}
                          onSelect={() =>
                            setGenre(
                              value.includes(genre.id)
                                ? value.filter(
                                    (selectedGenre: number) => selectedGenre !== genre.id
                                  )
                                : [...value, genre.id]
                            )
                          }
                        >
                          <Check
                            color={Color.white}
                            className={cn(
                              'mr-2 h-4 w-4',
                              Boolean(value.includes(genre.id)) ? 'opacity-100' : 'opacity-0'
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
            {!!error && <p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>}
          </>
        );
      }}
    />
  );
};

export default SelectGenres;
