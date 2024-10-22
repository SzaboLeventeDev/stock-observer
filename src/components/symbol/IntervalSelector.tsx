import { Interval } from '@/types/apis';

import { INTERVALS } from '@/constants';
import BaseButton from '../ui/BaseButton';

type IntervalSelectorProps = {
  onIntervalSelect: (interval: Interval) => void;
};
export default function IntervalSelector({
  onIntervalSelect,
}: IntervalSelectorProps) {
  return (
    <div className="flex gap-2 mb-3 overflow:x-auto">
      {INTERVALS.map((interval) => {
        return (
          <BaseButton
            key={interval}
            text={interval}
            buttonClick={() => onIntervalSelect(interval)}
          />
        );
      })}
    </div>
  );
}
