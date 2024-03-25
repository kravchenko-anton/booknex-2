import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { getFileUrl } from 'global/api-config';
import type { FC } from 'react';

interface UpdatePictureProperties {
  picture: string;
  id: number;
  bookTitle: string;
  onSuccess: () => void;
}

const UpdatePicture: FC<UpdatePictureProperties> = (properties) => {
  const { mutateAsync: updatePicture, isLoading: updatePictureLoading } = useMutation({
    mutationKey: ['update-picture'],
    mutationFn: ({ id, payload }: { id: number; payload: File }) =>
      api.book.updatePicture(id, payload),
    onSuccess: properties.onSuccess
  });

  return (
    <div>
      <input
        type='file'
        className='hidden'
        disabled={updatePictureLoading || !properties.bookTitle}
        onChange={async ({ target }) => {
          const file = target?.files?.[0];
          if (!file) return;
          await updatePicture({
            id: properties.id,
            payload: new File([file], `${properties.bookTitle}.png`, {
              type: 'image/png'
            })
          });
        }}
      />
      <img
        width={220}
        className='border-muted cursor-pointer rounded border-2'
        height={300}
        src={getFileUrl(properties.picture)}
        alt='Cover'
        onClick={() => {
          const element: HTMLElement | null = document.querySelector('input[type=file]');
          element?.click();
        }}
      />
      {!properties.bookTitle && (
        <p className='text-danger mt-0.5 text-xs italic'>{'Please select title of book'}</p>
      )}
    </div>
  );
};

export default UpdatePicture;
