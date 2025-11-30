import { cn } from '@/utils';
import { memo } from 'react';
import { createPortal } from 'react-dom';
import { useDateLabelPersist } from '../hooks';
import type { DateLabelProps } from '../type';

export const DateLabel = memo(
  ({ position, label, immediateDisappear, labelPersistent, renderDateLabel }: DateLabelProps) => {
    // showDateLabel only works when labelPersistent is false
    const { showDateLabel } = useDateLabelPersist(
      immediateDisappear || false,
      label,
      labelPersistent || false
    );
    if (!position || !label || !renderDateLabel) return null;
    if (!showDateLabel && !labelPersistent) return null;

    return createPortal(
      <div
        style={{ left: position.x, top: position.y }}
        className={cn('hidden md:block fixed z-50 transform -translate-x-1/2 pointer-events-none')}
        role="tooltip"
        aria-live="polite"
      >
        {renderDateLabel({ label })}
      </div>,
      document.body
    );
  }
);

DateLabel.displayName = 'DateLabel';
