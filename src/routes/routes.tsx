import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/podcast/home/home';
import Header from '../components/header';

const PodcastDetail = React.lazy(() => import('../pages/podcast/details/home'));
const EpisodeDetail = React.lazy(() => import('../pages/podcast/description-track/home'));

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Header />
    <main>
      <React.Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
        </Routes>
      </React.Suspense>
    </main>
  </BrowserRouter>
);

export default AppRoutes;
