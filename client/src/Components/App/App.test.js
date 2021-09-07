import { render, screen } from '@testing-library/react';
import App from './App';

test('renders recipes', () => {
  render(<App />);
  const linkElement = screen.getByText(/Recipes/i);
  expect(linkElement).toBeInTheDocument();
});
