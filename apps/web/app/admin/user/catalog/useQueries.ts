import api from '@/services';
import { successToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useQueries = ({ searchTerm = '', page = 0 }) => {
  const queryClient = useQueryClient();
  const { data: users } = useQuery({
    queryKey: ['users', searchTerm, page],
    queryFn: () => api.user.catalog(searchTerm, +page),
    select: (data) => data.data
  });

  const { mutateAsync: deleteUser, isLoading: deleteUserLoading } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: (id: number) => api.user.remove(id),
    onError(error: string) {
      console.log('error', error);
    },
    async onSuccess() {
      successToast('User deleted');
      await queryClient.invalidateQueries({
        queryKey: ['users']
      });
    }
  });

  return {
    users,
    deleteUser,
    deleteUserLoading
  };
};
