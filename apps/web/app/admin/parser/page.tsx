'use client'

import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { nFormatter } from '../../../../../libs/global/utils/number-formater'
import { useDebounce } from '../../../../mobile/src/hooks/useDebounce'
import Button from '../../../components/button/button'
import Field from '../../../components/field/field'
import { parserService } from '../../../services/parser/parser-services'
import { useParser } from '../../../utils/useParser'

const Page: FC = () => {

  const { parse, isLoading } = useParser()
  const { control, watch } = useForm()
  const search = useDebounce(watch('search'), 200)
  const { data: goodReadsBooks, isLoading:queryLoading } = useQuery(['good-reads books' + (search || '')], () =>
    parserService.all(search)
  )
	return <div className='w-full'>
    <div className='justify-between w-full items-center flex'>
    <h1 className='text-3xl font-medium'>Seeder</h1>
      <div className='flex gap-5'>
       <Field control={control} className='mb-0 h-full' name={'search'} placeholder='Search...' />
      <Button size={'sm'} onClick={() => parse({
       page: 2,
       url: 'https://www.goodreads.com/list/show/1.Best_Books_Ever',
      })} fullWidth color='primary' isLoading={isLoading}>
        {isLoading ? 'Loading...' : 'Parse'}
      </Button>
      </div>
    </div>
    {
      !goodReadsBooks ||  queryLoading ? <div>Loading...</div> :
        <table className='w-full bg-shade mt-4 rounded-xl'>
          <thead>
          <tr>
            <th className='min-w-[50px] border-r-2 border-b-2 p-1 border-gray'>Id</th>
            <th className='min-w-[100px] border-x-2 border-b-2 p-1 border-gray'>Picture</th>
            <th className='min-w-[100px] border-x-2 border-b-2 p-1 border-gray'>Title</th>
            <th className='min-w-[80px] border-x-2 border-b-2 p-1 border-gray'>Pages</th>
            <th className='min-w-[80px] border-x-2 border-b-2 p-1 border-gray'>Popularity</th>
            <th className='min-w-[100px] border-x-2 border-b-2 p-1 border-gray'>Description</th>
            <th className='min-w-[80px] border-x-2 border-b-2 p-1 border-gray'>Author name</th>
            <th className='min-w-[80px] border-x-2 border-b-2 p-1 border-gray'>Author Photo</th>
            <th className='min-w-[100px] border-r-2 border-b-2 p-1 border-gray'>Author description</th>
            <th className='min-w-[100px] border-l-2 border-b-2 p-1 border-gray'>Genres</th>
            <th className='min-w-[100px] border-l-2 border-b-2 p-1 border-gray'>Actions</th>
          </tr>
          </thead>
          <tbody>
          {goodReadsBooks.map((book) => (
            <tr key={book.title}
                className='border-b-2 border-b-vibrant h-[100px] max-h-[100px]  justify-center items-center'>
              <td className='min-w-[50px]  border-r-2 text-center border-vibrant'>{book.id}</td>
              <td className=' border-r-2 h-[100px] border-vibrant'>
                <img src={book.picture} className='rounded-xl mx-auto w-[80px]' alt={book.title} />
              </td>
              <td className='min-w-[100px]  h-[100px] border-r-2 border-vibrant text-center'>{book.title}</td>
              <td className='min-w-[80px] text-center  border-r-2 border-vibrant'>{book.pages}
              </td>
              <td className='min-w-[80px] border-r-2 border-vibrant text-center '>{nFormatter(book.popularity)}</td>
              <td className='min-w-[100px]  p-2 border-r-2 border-vibrant'>{book.description.slice(0, 50) + '...'}</td>
              <td className='border-r-2 border-vibrant min-w-[70px] text-center'>{book.authorName}</td>
              <td className=' border-r-2 h-[80px] border-vibrant'>
                <img src={book.authorPicture} className='rounded-xl w-[50px] mx-auto h-[50px]' alt={book.title} />
              </td>
              <td
                className='min-w-[100px]  p-2 border-r-2 border-vibrant'>{book.authorDescription.slice(0, 50) + '...'}</td>
              <td className='min-w-[100px]  p-2 border-r-2 border-vibrant'
              >{book.genres.join(',  ')}</td>

              <td className='min-w-[100px]  p-2 border-r-2 border-vibrant'>
                <div>
                  <Button className='mb-2' fullWidth color='success' size='sm'>Create</Button>
                  <Button color='danger' fullWidth size='sm'>Delete</Button>
                </div>
              </td>

            </tr>
          ))}
          </tbody>
        </table>
    }
  </div>
}

export default Page
