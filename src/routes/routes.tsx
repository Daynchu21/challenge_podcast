import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/podcast/home/home';

const PodcastDetail = React.lazy(() => import('../pages/podcast/details/home'));
const EpisodeDetail = React.lazy(() => import('../pages/podcast/description-chapter/home'));

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);

export default AppRoutes;
