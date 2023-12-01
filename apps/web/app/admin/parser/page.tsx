'use client'

import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import Field from '../../../components/field/field'

const Page: FC = () => {
  const { control, handleSubmit } = useForm()
	return <div className='w-full'>
    <div className='justify-between w-full items-center flex'>
    <h1 className='text-3xl font-medium'>Seeder</h1>
    <Field control={control}  className='w-[200px] mb-0' name={'search'} placeholder='Search...' />
    </div>
  </div>
}

export default Page
