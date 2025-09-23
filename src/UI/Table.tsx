import React from 'react';
import styles from './Table.module.scss';
import type { PodcastEntry } from '../hooks/usePodcastsDetails';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/date';
import { formatMillisToTime } from '../utils/time';

export type TableRow = {
  id: string;
  title: string;
  date: string;
  duration: string;
  onTitleClick: () => void;
};

export type TableProps = {
  rows: Array<PodcastEntry>;
  className?: string;
};

const Table: React.FC<TableProps> = ({ rows, className }) => {
  const navigate = useNavigate();

  const onTitleClick = (trackId: number, collectionId: number) => {
    navigate(`/podcast/${collectionId}/episode/${trackId}`);
  };
  return (
    <div className={styles.containerTable}>
      <table className={`${styles.table} ${className || ''}`}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.trackId}>
              <td>
                <span
                  className={styles.table__title}
                  onClick={() => onTitleClick(row.trackId, row.collectionId)}
                >
                  {row.trackName}
                </span>
              </td>
              <td>{formatDate(row.releaseDate || '')}</td>
              <td>{formatMillisToTime(row.trackTimeMillis || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
