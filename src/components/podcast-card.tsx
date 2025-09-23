import React from 'react';
import styles from './podcast.module.scss';
import Image from '../UI/Image';

interface podcastDetailArtist {
  title: string;
  subtitle: string;
  description?: string;
  image?: string;
}

const PodcastCard: React.FC<podcastDetailArtist> = (props) => {
  const { image, title, subtitle, description } = props;
  return (
    <div className={styles.podcastCard}>
      <Image src={image || ''} alt="img-post-card" ariaLabel="imgtxt" />
      <div className={styles.content}>
        <hr className={styles.hr} />
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>{subtitle}</p>
        <hr className={styles.hr} />
        <p className={styles.descriptionLabel}>Description:</p>
        <div
          className={styles.descriptionText}
          dangerouslySetInnerHTML={{
            __html: description ?? '',
          }}
        ></div>
      </div>
    </div>
  );
};
export default PodcastCard;
