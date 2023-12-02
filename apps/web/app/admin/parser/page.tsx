'use client'

import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/button/button'
import Field from '../../../components/field/field'
import { parserService } from '../../../services/parser/parser-services'

const Page: FC = () => {
  const { data: goodReadsBooks } = useQuery(['good-reads books'], () =>
    parserService.all()
  )
  console.log(goodReadsBooks)
  const { control } = useForm()
	return <div className='w-full'>
    <div className='justify-between w-full items-center flex'>
    <h1 className='text-3xl font-medium'>Seeder</h1>
      <div className='flex gap-5'>
       <Field control={control} className='mb-0 h-full' name={'search'} placeholder='Search...' />
      <Button fullWidth color='primary'>Start parsing</Button>
      </div>
    </div>
  </div>
}

export default Page
