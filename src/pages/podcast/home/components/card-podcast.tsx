import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../../UI/Image';
import styles from './card-podcast.module.scss';

export type PodcastCardProps = {
  title: string;
  author: string;
  imageSrc: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
};

const CardPodcast: React.FC<PodcastCardProps> = ({
  title,
  author,
  imageSrc,
  alt = '',
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
      <div className={styles.cardPodcast}>
        <div className={styles.cardPodcast__content}>
          <Image
            src={imageSrc}
            alt={alt || title}
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
