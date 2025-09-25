import React from 'react';
import styles from './podcast.module.scss';
import Image from '../../shared/UI/Image';

interface podcastDetailArtist {
  title: string;
  author: string;
  description?: string;
  image?: string;
}

const PodcastCard: React.FC<podcastDetailArtist> = (props) => {
  const { image, title, author, description } = props;
  return (
    <div className={styles.podcastCard}>
      <Image src={image || ''} alt="image artist album" ariaLabel="imgtxt" size={220} />
      <div className={styles.content}>
        <hr className={styles.hr} />
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>by {author}</p>
        <hr className={styles.hr} />
        <p className={styles.descriptionLabel}>Description:</p>
        <div
          data-testid="podcast-detail"
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
