import { render, screen } from '@testing-library/react';
import SearchIngredient from './SearchIngredient';

test('renders SearchIngredient', () => {
  render(<SearchIngredient />);
  const linkElement = screen.getByText(/Search by Ingredients/i);
  expect(linkElement).toBeInTheDocument();
});
