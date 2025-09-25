import React from 'react';
import { usePodcastsDetails } from '../../../features/fetch-episodes/usePodcastsDetails';
import PodcastCard from '../../../widgets/podcast-card';
import style from './home.module.scss';
import { useParams } from 'react-router-dom';
import DetailsTrack from './components/details-track';

const DetailsChapterHome: React.FC = () => {
  const { data, isLoading, error } = usePodcastsDetails();
  const { episodeId } = useParams<{ episodeId: string }>();
  const trackData = React.useMemo(() => {
    return data?.episodes.find((t) => t.id === Number(episodeId));
  }, [data, episodeId]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar detalles del podcast</p>;
  if (!data) return <p>No hay datos disponibles</p>;

  return (
    <div className={style.podcastLayout}>
      <PodcastCard
        image={data.author.image}
        title={data.author.title}
        author={data.author.author}
        description={data.author.description}
      />
      {trackData ? (
        <div className={style.episodeSection}>
          <DetailsTrack
            title={trackData?.title}
            urlAudio={trackData?.audioUrl}
            description={trackData?.description || ''}
          />
        </div>
      ) : null}
    </div>
  );
};
export default DetailsChapterHome;
