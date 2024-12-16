// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Выберите Спортивное Событие/i);
  expect(linkElement).toBeInTheDocument();
});
