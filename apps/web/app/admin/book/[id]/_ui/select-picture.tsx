import { useUploadFile } from '@/hooks/useFileUpload';
import { getFileUrl } from 'global/api-config';
import { Controller, type Control } from 'react-hook-form';

interface SelectPictureProperties {
  disable?: boolean;
  bookTitle: string | undefined;
  control: Control<any>;
}

export const SelectPicture = ({ bookTitle, control, disable }: SelectPictureProperties) => {
  const { upload, uploadLoading } = useUploadFile();
  return (
    <Controller
      control={control}
      name={'picture'}
      render={({ field: { value = '', onChange: setPicture }, fieldState: { error } }) => (
        <>
          <div>
            <div>
              <input
                type='file'
                className='hidden'
                disabled={uploadLoading || disable || !bookTitle}
                onChange={async ({ target }) => {
                  const file = new File([target?.files?.[0] as Blob], `${bookTitle}.png`);
                  console.log('file uploaded', file);
                  if (!file) return;
                  upload({
                    blob: file,
                    folder: 'booksCovers'
                  }).then((response) => {
                    setPicture(response.data.name);
                  });
                }}
              />
              <img
                width={220}
                className='border-bordered  cursor-pointer rounded border-[1px]'
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
          {!bookTitle && (
            <p className='text-danger mt-0.5 text-xs italic'>{'Please select title of book'}</p>
          )}
        </>
      )}
    />
  );
};
