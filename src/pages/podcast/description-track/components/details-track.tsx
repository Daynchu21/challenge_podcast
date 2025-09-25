import React from 'react';
import style from './details-track.module.scss';
import type { detailsTrackProps } from '../../../../entities';

const DetailsTrack: React.FC<detailsTrackProps> = ({ title, description, urlAudio }) => {
  return (
    <div className={style.container}>
      <h2 data-testid="episode-title">{title}</h2>
      <p data-testid="episode-description">{description}</p>
      <hr className={style.hr} />
      <audio
        style={{ width: '100%' }}
        controls
        preload="metadata"
        src={urlAudio}
        data-testid="episode-audio"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default DetailsTrack;
