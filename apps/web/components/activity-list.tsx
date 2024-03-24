import { SheetComponent, SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/utils';
import type { ActivitiesOutput } from 'global/utils/activity-transformer';

import { useState, type FC } from 'react';
import ActivityCalendar from 'react-activity-calendar';

const activityPalette = [
  'hsl(0, 0%, 20%)',
  'hsl(0, 0%, 30%)',
  'hsl(0, 0%, 40%)',
  'hsl(0, 0%, 60%)',
  'hsl(0, 0%, 80%)',
  '#7DB9B6',
  '#E96479',
  '#E33B54',
  '#D61F3A',
  '#B31930',
  '#A1172C'
];

interface ActivityListProperties {
  onlyGraph?: boolean;
  data: ActivitiesOutput[];
}
const ActivityList: FC<ActivityListProperties> = ({ onlyGraph = false, data = [] }) => {
  const [selectActivity, setSelectActivity] = useState<ActivitiesOutput | null>(null);
  const onActivityClick = (active: ActivitiesOutput) => {
    if (active.level === 0) return;
    setSelectActivity(active);
  };
  return (
    <div className='sm:min-w-full xl:min-w-[600px]'>
      <ActivityCalendar
        hideColorLegend={onlyGraph}
        hideTotalCount={onlyGraph}
        hideMonthLabels={onlyGraph}
        maxLevel={10}
        data={data}
        style={{
          width: '100%'
        }}
        theme={{
          dark: activityPalette
        }}
        eventHandlers={{
          // @ts-ignore because by default it return Activity only but me need activities
          onClick: () => onActivityClick
        }}
      />
      <SheetComponent isOpen={!!selectActivity} onClose={() => setSelectActivity(null)}>
        {selectActivity ? (
          <>
            <SheetHeader className='pb-2'>
              <h1 className='text-3xl font-medium'>
                Activities: {new Date(selectActivity.date).toDateString()}
              </h1>
            </SheetHeader>
            <div className='no-scrollbar h-[95%] w-full overflow-y-scroll'>
              {selectActivity.activities?.map((activity) => (
                <p key={activity.time} className={cn('text-success  font-mono text-lg')}>
                  <b className='text-gray'>[{activity.time}]</b>{' '}
                  <b
                    className='font-mono'
                    style={{
                      color: activityPalette[activity.importance]
                    }}
                  >
                    [{activity.importance}]
                  </b>{' '}
                  {activity.message}
                </p>
              ))}
            </div>
          </>
        ) : (
          <div>Nothing selected</div>
        )}
      </SheetComponent>
    </div>
  );
};

export default ActivityList;
