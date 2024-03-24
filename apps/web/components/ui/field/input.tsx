import { cn } from '@/utils';
import { Color } from 'global/colors';
import type { FC } from 'react';
import { settings } from './settings';
import type { InputProperties } from './types';

const Input: FC<InputProperties> = ({
  icon: Icon,
  isError = false,
  className = '',
  variant = 'foreground',
  ...properties
}) => (
  <div className='relative flex items-center justify-center'>
    <input
      className={cn(
        'placeholder-gray focus:shadow-outline w-full rounded-lg border-0 px-4 py-2 text-sm text-white duration-200 ease-linear focus:outline-0',
        Icon && 'pl-9',
        isError && 'border-danger border-2',
        settings.colors[variant],
        properties.disabled && 'cursor-not-allowed',
        className
      )}
      {...properties}
    />
    {Icon ? <Icon width={20} height={20} color={Color.gray} className='absolute left-2.5' /> : null}
  </div>
);

export default Input;
