'use client';

import Editor from '@/app/admin/book/_shared/book-editor/editor';
import SelectGenres from '@/app/admin/book/create/select-genres';
import { SelectPicture } from '@/app/admin/book/create/select-picture';
import { useCreateForm } from '@/app/admin/book/create/useCreateForm';
import { Button, ErrorMessage, Field, FormTextArea } from '@/components/ui';
import type { PayloadEBook } from 'global/api-client';
import { PenNib, Star } from 'icons';
import type { FC } from 'react';
//TODO: сдеалть всё на компонентах из [id]
const Page: FC = () => {
  const form = useCreateForm();
  console.debug(form.errors);

  return (
    <div>
      <h1 className='mb-4 text-center text-3xl font-medium'>Create book</h1>
      <div className=' mb-4 justify-between gap-5  md:flex'>
        <div>
          <div>
            <h1 className='mt-2  text-xl'>Cover</h1>
            <SelectPicture control={form.control} bookTitle={form.watch('title')} />
          </div>
          <h1 className='mb-2 mt-2  text-xl'>Genres</h1>

          <SelectGenres control={form.control} />
        </div>
        <div className='w-11/12'>
          <div className='mt-2  gap-3 md:flex'>
            <div className=' md:w-1/2'>
              <h1 className='my-2'>Title</h1>
              <Field type='text' control={form.control} name='title' placeholder='Title' />
            </div>
            <div className=' md:w-1/3'>
              <h1 className='my-2'>Author</h1>
              <Field
                type='text'
                icon={PenNib}
                control={form.control}
                name='author'
                placeholder='Author'
              />
            </div>

            <div className='md:w-1/4'>
              <h1 className='my-2'>Rating</h1>
              <Field
                icon={Star}
                type='number'
                control={form.control}
                name='rating'
                placeholder='Rating'
                min={1}
                max={5}
              />
            </div>
          </div>
          <h1 className='mb-2 mt-4'>Description</h1>
          <FormTextArea
            control={form.control}
            name='description'
            placeholder='Enter description'
            className='h-[250px]'
          />
        </div>
      </div>
      <Editor updateBooks={(books: PayloadEBook[]) => form.setValue('ebook', books)} />
      <ErrorMessage name='ebook' errors={form.errors} />

      <Button
        size='md'
        isLoading={form.createLoading}
        className='mt-4'
        variant={Object.keys(form.errors).length > 0 ? 'danger' : 'foreground'}
        onClick={form.submit}
      >
        Create
      </Button>
    </div>
  );
};

export default Page;
