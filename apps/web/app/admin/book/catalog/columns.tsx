import { Button } from '@/components/ui';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/utils';
import type { ColumnDef } from '@tanstack/react-table';
import type { Book } from 'global/api-client';
import { getFileUrl } from 'global/api-config';
import { minutesToTime } from 'global/helpers/time-converter';
import Image from 'next/image';

export const columns = ({
  preview
}: {
  preview: (id: number) => void;
}): ColumnDef<Book, unknown>[] => [
  {
    id: 'id',
    enableHiding: false,
    header: () => <p className='text-center text-lg'>id</p>,
    cell: ({ row }) => <p className='text-2xl'>{row.original.id}</p>
  },
  {
    id: 'picture',
    enableHiding: false,
    header: () => <p className='text-center text-lg'>Picture</p>,
    cell: ({ row }) => (
      <Image
        alt={row.original.title}
        className=' mx-auto w-[60px] cursor-pointer rounded'
        src={getFileUrl(row.original.picture)}
        width={200}
        height={250}
        onClick={() => preview(row.original.id)}
      />
    )
  },
  {
    id: 'Information',
    header: () => <p className='text-center text-lg'>Information</p>,
    cell: ({ row }) => (
      <button
        className='items-start justify-start text-left'
        onClick={() => preview(row.original.id)}
      >
        <h3 className='mb-1 text-xl'>{row.original.title}</h3>
        <p>{row.original.author}</p>
      </button>
    )
  },

  {
    id: 'description',
    header: () => <p className='text-center text-lg'>Description</p>,
    cell: ({ row }) => (
      <Drawer>
        <DrawerTrigger asChild>
          <p className='line-clamp-3'>{row.original.description}</p>
        </DrawerTrigger>
        <DrawerContent>
          <span className='p-6 pb-10 text-justify text-xl'>{row.original.description}</span>
        </DrawerContent>
      </Drawer>
    )
  },

  {
    id: 'visible',
    enableHiding: false,
    header: () => <p className='text-center text-lg'>Visible</p>,
    cell: ({ row }) => (
      <p className='text-center text-lg font-light'>
        <b
          className={cn(
            'items-center font-bold',
            row.original.visible ? 'text-success' : 'text-danger'
          )}
        >
          {row.original.visible ? 'Visible' : 'Hidden'}
        </b>
      </p>
    )
  },
  {
    id: 'rating',
    enableHiding: false,
    header: () => <p className='text-center text-lg'>Rating</p>,
    cell: ({ row }) => (
      <p className=' text-center text-xl font-light'>
        <b className='text-warning font-bold'>{row.original.rating}</b>
      </p>
    )
  },
  {
    id: 'reading time',
    enableHiding: false,
    header: () => <p className='w-[120px] text-center text-lg'>Reading time</p>,
    cell: ({ row }) => (
      <p className='text-center text-xl font-light'>
        <b
          className={cn('font-bold', row.original.readingTime === 0 ? 'text-danger' : 'text-gray')}
        >
          {minutesToTime(row.original.readingTime)}{' '}
        </b>
      </p>
    )
  },
  {
    id: 'genres',
    enableHiding: false,
    header: () => <p className='text-center text-lg'>Genres</p>,
    cell: ({ row }) => (
      <div className=' max-w-[110px] items-center justify-center gap-1'>
        {row.original.genres.map((genre) => (
          <Button size='sm' variant='muted' className='mb-2 w-full' key={genre.id}>
            {genre.name}
          </Button>
        ))}
      </div>
    )
  }
];
