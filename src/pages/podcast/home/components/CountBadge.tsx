import React, { useMemo } from 'react';
import styles from './count-badge.module.scss';

type Props = {
  count: number;
  className?: string;
  ariaLabel?: string;
};

const CountBadge: React.FC<Props> = ({
  count,
  className,
  ariaLabel = 'Elementos visibles en pantalla',
}) => {
  const classes = useMemo(() => [styles.badge, className].filter(Boolean).join(' '), [className]);

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      title={`${count}`}
    >
      {count}
    </div>
  );
};

export default CountBadge;
