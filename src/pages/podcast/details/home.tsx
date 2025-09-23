import React from 'react';
import Table from '../../../UI/Table';
import { usePodcastsDetails } from '../../../hooks/usePodcastsDetails';
import PodcastCard from '../../../components/podcast-card';
import style from './home.module.scss';
import HeaderTrack from './components/headerTraks';

const DetailsPodcastHome: React.FC = () => {
  const { data, isLoading, error } = usePodcastsDetails();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar detalles del podcast</p>;
  if (!data) return <p>No hay datos disponibles</p>;
  return (
    <div className={style.podcastLayout}>
      <PodcastCard
        image={data.author.image}
        title={data.author.title}
        subtitle={data.author.subtitle}
        description={data.author.description}
      />
      <div className={style.episodeSection}>
        <HeaderTrack trackCounts={data.tracks.length} />
        <div>
          <Table rows={data.tracks} />
        </div>
      </div>
    </div>
  );
};
export default DetailsPodcastHome;
