import { ArrowDownIcon } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/Button';
import { cn } from '@/utils';

import type { DateGranularity } from '../type';
import { addTime, formatForDisplay, getDateFromPercent } from '../utils';

type TimeDisplayProps = {
  className?: string;
  position: number;
  startDate: Date;
  endDate: Date;
  granularity: DateGranularity;
  setDateTime: (date: Date, target?: 'point' | 'rangeStart' | 'rangeEnd') => void;
};

export const TimeDisplay = ({
  className,
  position,
  startDate,
  endDate,
  granularity,
  setDateTime,
}: TimeDisplayProps) => {
  const dateLabel = useMemo(() => {
    const date = getDateFromPercent(position, startDate, endDate);
    return formatForDisplay(date, granularity, 'en-AU', true);
  }, [position, startDate, endDate, granularity]);

  const handleDateUpdate = (direction: 'forward' | 'backward') => {
    const currentDate = getDateFromPercent(position, startDate, endDate);
    const amount = direction === 'forward' ? 1 : -1;

    const unit = granularity;
    const newDate = addTime(currentDate, amount, unit);
    setDateTime(newDate, 'point');
  };

  return (
    <div className={cn('flex rounded-xl overflow-hidden', className)}>
      <div className="h-full flex items-center justify-center md:w-28">
        <p className="text-imos-grey font-semibold text-xs md:text-base">{dateLabel}</p>
      </div>
      <div className="h-full  items-center hidden md:flex">
        <Button variant="ghost" onClick={() => handleDateUpdate('backward')} className="p-0!">
          <ArrowDownIcon className="rotate-90" color="imos-grey" size="xxl" />
        </Button>
        <Button variant="ghost" onClick={() => handleDateUpdate('forward')} className="p-0!">
          <ArrowDownIcon className="rotate-270" color="imos-grey" size="xxl" />
        </Button>
      </div>
    </div>
  );
};
