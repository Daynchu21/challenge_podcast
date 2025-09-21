import React from 'react';
import { usePodcasts } from '../../../hooks/usePodcasts';
import CardPodcast from './components/card-podcast';
import Input from '../../../UI/Input';
import CountBadge from './components/CountBadge';
import styles from './home.module.scss';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { data, isLoading, error } = usePodcasts();
  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();

  const filtered = data?.filter((pod) =>
    (pod['im:name'].label + pod['im:artist'].label).toLowerCase().includes(filter.toLowerCase()),
  );

  const onSelectPodcast = (podcastId: string) => {
    navigate(`/podcast/${podcastId}`);
  };

  if (isLoading) return <p className={styles.loading}>Cargando...</p>;
  if (error) return <p className={styles.error}>Error al cargar podcasts</p>;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.filterBar}>
        <CountBadge count={filtered?.length || 0} />
        <Input
          type="text"
          placeholder="filter podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.gridWrapper}>
        <div className={styles.podcastGrid}>
          {filtered?.map((p) => (
            <CardPodcast
              key={p.id.attributes['im:id']}
              title={p['im:name'].label}
              author={p['im:artist'].label}
              imageSrc={p['im:image'][2].label}
              onClick={() => onSelectPodcast(p.id.attributes['im:id'])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
