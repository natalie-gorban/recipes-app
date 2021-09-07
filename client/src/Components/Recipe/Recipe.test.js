import { render, screen } from '@testing-library/react';
import Recipe from './Recipe';

test('renders Recipe', () => {
  render(<Recipe />);
  const linkElement = screen.getByText(/Recipe/i);
  expect(linkElement).toBeInTheDocument();
});
