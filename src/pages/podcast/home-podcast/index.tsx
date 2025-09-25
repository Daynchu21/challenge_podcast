import React from 'react';
import CardPodcast from './components/card-podcast';
import CountBadge from './components/CountBadge';
import styles from './home.module.scss';
import { useNavigate } from 'react-router-dom';
import { usePodcasts } from '../../../features/fetch-podcasts/usePodcasts';
import Input from '../../../shared/UI/Input';

const Home: React.FC = () => {
  const { data, isLoading, error } = usePodcasts();
  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();

  const filtered = data?.filter((pod) =>
    (pod.author + pod.title).toLowerCase().includes(filter.toLowerCase()),
  );

  const onSelectPodcast = (podcastId: string) => {
    navigate(`/podcast/${podcastId}`);
  };

  if (isLoading)
    return (
      <p className={styles.loading} data-testid="loader">
        Loading...
      </p>
    );
  if (error) return <p className={styles.error}>Error al cargar podcasts</p>;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.filterBar}>
        <CountBadge count={filtered?.length || 0} />
        <label htmlFor="search-input" hidden>
          Buscar podcasts
        </label>
        <Input
          type="text"
          placeholder="filter podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
          dataTestId="search-input"
          id="search-input"
          ariaLabel="search-input"
        />
      </div>

      <div className={styles.gridWrapper}>
        <div className={styles.podcastGrid}>
          {filtered?.map((p) => (
            <CardPodcast
              key={p.id}
              title={p.title}
              author={p.author}
              imageSrc={p.images}
              onClick={() => onSelectPodcast(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
