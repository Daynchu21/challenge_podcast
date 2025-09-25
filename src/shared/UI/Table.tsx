import React from 'react';
import styles from './Table.module.scss';
import { useNavigate } from 'react-router-dom';
import type { Episode } from '../../entities';
import { formatDate } from '../lib/date';
import { formatMillisToTime } from '../lib/time';

export type TableRow = {
  id: string;
  title: string;
  date: string;
  duration: string;
  onTitleClick: () => void;
};

export type TableProps = {
  rows: Array<Episode>;
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
            <tr key={row.id} data-testid="episode-row">
              <td>
                <span
                  className={styles.table__title}
                  onClick={() => onTitleClick(row.id, row.collectionId)}
                  data-testid="episode-link"
                >
                  {row.title}
                </span>
              </td>
              <td>{formatDate(row.releaseDate || '')}</td>
              <td>{formatMillisToTime(row.duration || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
