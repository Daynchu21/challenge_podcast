import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/podcast/home-podcast';
import Header from '../widgets/header';
import DetailsPodcastHome from '../pages/podcast/details';
import DetailsChapterHome from '../pages/podcast/description-track';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Header />
    <main>
      <React.Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/podcast/:podcastId"
            element={
              <React.Suspense fallback={<div>Cargando podcast...</div>}>
                <DetailsPodcastHome />
              </React.Suspense>
            }
          />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={
              <React.Suspense fallback={<div>Cargando episodio...</div>}>
                <DetailsChapterHome />
              </React.Suspense>
            }
          />
        </Routes>
      </React.Suspense>
    </main>
  </BrowserRouter>
);

export default AppRoutes;
