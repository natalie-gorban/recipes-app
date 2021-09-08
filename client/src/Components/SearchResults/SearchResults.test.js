import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

test('renders SearchResults', () => {
  render(<SearchResults owner='public'/>);
  const linkElement = screen.getByText(/Owner: public/i);
  expect(linkElement).toBeInTheDocument();
});
