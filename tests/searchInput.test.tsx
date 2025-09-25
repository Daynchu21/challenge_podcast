import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Input from '../src/shared/UI/Input';
import { vi } from 'vitest';

test('llama al callback al escribir texto', () => {
  const onChange = vi.fn();
  render(
    <BrowserRouter>
      <Input value="" onChange={(e) => onChange(e.target.value)} placeholder="filter podcasts..." />
    </BrowserRouter>,
  );

  const input = screen.getByPlaceholderText(/filter podcasts.../i);
  fireEvent.change(input, { target: { value: 'rock' } });

  expect(onChange).toHaveBeenCalledWith('rock');
});
