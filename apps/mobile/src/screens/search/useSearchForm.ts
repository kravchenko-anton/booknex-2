import { useDebounce } from '@/hooks/useDebounce';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export interface SearchFormDataType {
  searchTerm: string;
}

export const useSearchForm = () => {
  const { control, watch, reset } = useForm<SearchFormDataType>({
    mode: 'onChange',
    defaultValues: {
      searchTerm: ''
    }
  });

  const clearSearch = () => {
    reset({ searchTerm: '' });
  };

  const searchTerm = watch('searchTerm');
  const debouncedSearch = (useDebounce(searchTerm, 500) as string) || '';

  return useMemo(
    () => ({ debouncedSearch, searchTerm, control, clearSearch }),
    [searchTerm, debouncedSearch]
  );
};
