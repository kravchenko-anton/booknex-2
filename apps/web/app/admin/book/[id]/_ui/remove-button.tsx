import { Button } from '@/components/ui';
import api from '@/services/api';
import { cn } from '@/utils';
import { secureRoutes } from '@/utils/route';
import { acceptToast, successToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

interface BookVisibleButtonProperties {
  id: number;
  onSuccess: () => void;
}
export const RemoveButton: FC<BookVisibleButtonProperties> = (properties) => {
  const router = useRouter();
  const { mutateAsync: remove, isLoading: removeLoading } = useMutation({
    mutationKey: ['remove-book'],
    mutationFn: (id: number) => api.book.remove(id),
    onSuccess: () => {
      successToast('Book removed');
      router.push(secureRoutes.bookRoute);
    }
  });
  return (
    <Button
      size={'sm'}
      isLoading={removeLoading}
      className={cn('bg-danger rounded text-white')}
      onClick={() =>
        acceptToast('Are you sure you want to delete this book?', {
          action: {
            label: 'Delete',
            onClick: () => remove(properties.id)
          }
        })
      }
    >
      Remove
    </Button>
  );
};
