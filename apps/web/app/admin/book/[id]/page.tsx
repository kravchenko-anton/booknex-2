'use client';

import BookStatistic from '@/app/admin/book/[id]/_ui/book-statistic';
import BookOverview from '@/app/admin/book/[id]/_ui/ebook-tabs';
import { RemoveButton } from '@/app/admin/book/[id]/_ui/remove-button';
import ReviewTable from '@/app/admin/book/[id]/_ui/review/review-table';
import UpdateBio from '@/app/admin/book/[id]/_ui/update-bio';
import UpdateGenres from '@/app/admin/book/[id]/_ui/update-genres';
import UpdatePicture from '@/app/admin/book/[id]/_ui/update-picture';
import { VisibleButton } from '@/app/admin/book/[id]/_ui/visible-button';
import ActivityList from '@/components/activity-list';
import Loader from '@/components/ui/loader/loader';
import api from '@/services';
import { validateNumberParameter } from '@/utils/validate-parameter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const Page = () => {
  const parameters = useParams();
  const queryClient = useQueryClient();

  const id = validateNumberParameter(parameters.id);

  const { data: book } = useQuery({
    queryKey: ['book-overview', id],
    queryFn: () => api.book.adminInfoById(id),
    select: (data) => data.data
  });
  const onUpdateSuccess = () => {
    queryClient.invalidateQueries(['book-overview', id]);
  };

  if (!book) return <Loader />;

  return (
    <div>
      <h1 className='text-3xl'>Book overview</h1>
      <div className='mt-4 flex  gap-5 px-2 md:flex'>
        <div>
          <UpdatePicture picture={book.picture} id={book.id} onSuccess={onUpdateSuccess} />
          <div className='mt-4 px-0.5'>
            <BookStatistic
              readingTime={book.readingTime}
              createdAt={book.createdAt}
              _count={book._count}
              updatedAt={book.updatedAt}
            />
            <div className='mb-4 flex gap-2 md:mt-0'>
              <VisibleButton visible={book.visible} id={book.id} onSuccess={onUpdateSuccess} />
              <RemoveButton id={book.id} onSuccess={onUpdateSuccess} />
            </div>
          </div>
        </div>

        <div className='md:w-5/6'>
          <UpdateBio
            id={book.id}
            author={book.author}
            title={book.title}
            description={book.description}
            rating={book.rating}
            readingTime={book.readingTime}
            onSuccess={onUpdateSuccess}
          />
          <UpdateGenres bookId={book.id} defaultGenres={book.genres.map((genre) => genre.id)} />
          <ActivityList data={book.activities} />

          <BookOverview
            bookId={book.id}
            onSuccess={() => {
              onUpdateSuccess();
              queryClient.invalidateQueries(['stored-ebook', book.id]);
            }}
          />
          <ReviewTable review={book.review} />
        </div>
      </div>
    </div>
  );
};
export default Page;
