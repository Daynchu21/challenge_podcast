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
  if (!data?.author) return <p>No hay datos disponibles</p>;
  console.log(data, 'data');
  return (
    <div className={style.podcastLayout}>
      <PodcastCard
        image={data.author.image}
        title={data.author.title}
        author={data.author.author}
        description={data.author.description}
      />
      <div className={style.episodeSection}>
        <HeaderTrack trackCounts={data.episodes.length} />
        <Table rows={data.episodes} />
      </div>
    </div>
  );
};
export default DetailsPodcastHome;
