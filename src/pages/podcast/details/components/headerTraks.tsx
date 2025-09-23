import React from 'react';
interface headerTrackProps {
  trackCounts: number;
}

const HeaderTrack: React.FC<headerTrackProps> = ({ trackCounts }) => {
  return (
    <div
      style={{
        boxShadow: '-1px 0px 8px -1px rgba(0, 0, 0, 0.51)',
        padding: '1rem',
      }}
    >
      <h2> Episodes: {trackCounts}</h2>
    </div>
  );
};

export default HeaderTrack;
