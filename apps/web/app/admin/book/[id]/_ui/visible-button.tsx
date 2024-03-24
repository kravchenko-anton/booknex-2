import { Button } from '@/components/ui';
import api from '@/services';
import { cn } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import type { FC } from 'react';

interface BookVisibleButtonProperties {
  visible: boolean;
  id: number;
  onSuccess: () => void;
}
export const VisibleButton: FC<BookVisibleButtonProperties> = (properties) => {
  const { mutateAsync: toggleVisible, isLoading: toggleVisibleLoading } = useMutation({
    mutationKey: ['toggle-Visible'],
    mutationFn: ({ id, payload }: { id: number; payload: boolean }) =>
      api.book.update(id, { visible: payload }),
    onSuccess: properties.onSuccess
  });
  return (
    <Button
      size={'sm'}
      className={cn(properties.visible ? 'bg-success' : 'bg-warning')}
      isLoading={toggleVisibleLoading}
      onClick={async () => {
        await toggleVisible({ id: properties.id, payload: !properties.visible });
      }}
    >
      {properties.visible ? 'Hide' : 'Show'}
    </Button>
  );
};
