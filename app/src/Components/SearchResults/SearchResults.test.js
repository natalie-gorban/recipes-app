import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

test('renders SearchResults', () => {
  render(<SearchResults />);
  const linkElement = screen.getByText(/SearchResults/i);
  expect(linkElement).toBeInTheDocument();
});
