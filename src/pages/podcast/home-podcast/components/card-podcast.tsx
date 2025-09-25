import React from 'react';
import { motion } from 'framer-motion';
import styles from './card-podcast.module.scss';
import Image from '../../../../shared/UI/Image';

export type PodcastCardProps = {
  title: string;
  author: string;
  imageSrc: string;
  className?: string;
  onClick?: () => void;
};

const CardPodcast: React.FC<PodcastCardProps> = ({
  title,
  author,
  imageSrc,
  className,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : -1}
      className={className}
    >
      <div className={styles.cardPodcast} data-testid="podcast-item">
        <div className={styles.cardPodcast__content}>
          <Image
            src={imageSrc}
            alt={`Podcast cover image for ${title}`}
            className={styles.cardPodcast__image}
            ariaLabel="Podcast cover image"
            size={112}
            rounded={true}
          />

          <p className={styles.cardPodcast__title}>{title}</p>
          <p className={styles.cardPodcast__author}>Author: {author}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CardPodcast;
