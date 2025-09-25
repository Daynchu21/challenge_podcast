import React from 'react';
interface headerTrackProps {
  trackCounts: number;
}

const HeaderTrack: React.FC<headerTrackProps> = ({ trackCounts }) => {
  return (
    <div
      style={{
        boxShadow: 'var(--shadow-lg)',
        padding: '1rem',
      }}
    >
      <h2> Episodes: {trackCounts}</h2>
    </div>
  );
};

export default HeaderTrack;
