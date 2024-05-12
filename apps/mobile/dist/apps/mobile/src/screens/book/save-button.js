import api from '@/api';
import { AnimatedIcon } from '@/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MutationKeys, QueryKeys } from 'global/utils/query-keys';
import { Bookmarked } from 'icons';
const SaveButton = ({ slug }) => {
    const queryClient = useQueryClient();
    const { mutateAsync: toggleSave, isLoading: toggleSaveLoading } = useMutation({
        mutationKey: MutationKeys.book.toggleSaveBySlug(slug),
        mutationFn: (slug) => api.user.toggleSave(slug),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QueryKeys.book.isSaved(slug)
            });
            await queryClient.invalidateQueries({
                queryKey: QueryKeys.library
            });
        }
    });
    const { data: isSaved } = useQuery({
        queryKey: QueryKeys.book.isSaved(slug),
        queryFn: () => api.user.isSaved(slug),
        select: data => data.data
    });
    return (<AnimatedIcon variant='muted' icon={Bookmarked} fatness={2} disabled={toggleSaveLoading} size='md' className='ml-3' fill={!!isSaved} onPress={() => toggleSave(slug)}/>);
};
export default SaveButton;
//# sourceMappingURL=save-button.js.map