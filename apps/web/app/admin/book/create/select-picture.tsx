import { useUploadFile } from '@/hooks/useFileUpload';
import { getFileUrl } from 'global/api-config';
import type { CreateBookValidationType } from 'global/dto/book/create.book.dto';
import Image from 'next/image';
import type { FC } from 'react';
import { Controller, type Control } from 'react-hook-form';

interface SelectPictureProperties {
  disable?: boolean;
  control: Control<CreateBookValidationType, any, CreateBookValidationType>;
}

export const SelectPicture: FC<SelectPictureProperties> = ({ control, disable }) => {
  const { upload, uploadLoading } = useUploadFile();
  return (
    <Controller
      control={control}
      name='picture'
      render={({ field: { value = '', onChange: setPicture }, fieldState: { error } }) => (
        <>
          <div>
            <div>
              <input
                type='file'
                className='hidden'
                disabled={uploadLoading || disable}
                onChange={async ({ target }) => {
                  const file = target?.files?.[0];
                  if (!file) return;
                  upload({
                    blob: new File([file], 'book-cover.jpg'),
                    folder: 'booksCovers'
                  }).then((response) => {
                    setPicture(response.data.name);
                  });
                }}
              />
              <Image
                width={220}
                className='border-muted  cursor-pointer rounded-lg border-2'
                height={300}
                src={getFileUrl(value)}
                alt='Cover'
                onClick={() => {
                  const element: HTMLElement | null = document.querySelector('input[type=file]');
                  element?.click();
                }}
              />
            </div>
          </div>
          {!!error && <p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>}
        </>
      )}
    />
  );
};
