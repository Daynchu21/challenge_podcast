import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PodcastCard from '../src/widgets/podcast-card';

describe('PodcastCard', () => {
  it('muestra título y autor', () => {
    render(
      <BrowserRouter>
        <PodcastCard description="123" title="My Podcast" author="Author X" image="test.png" />
      </BrowserRouter>,
    );

    expect(screen.getByText('My Podcast')).toBeInTheDocument();
    expect(screen.getByText('by Author X')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.png');
  });
});
