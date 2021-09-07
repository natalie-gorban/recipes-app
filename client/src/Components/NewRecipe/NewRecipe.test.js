import { render, screen } from '@testing-library/react';
import NewRecipe from './NewRecipe';

test('renders NewRecipe', () => {
  render(<NewRecipe />);
  const linkElement = screen.getByText(/New Recipe/i);
  expect(linkElement).toBeInTheDocument();
});
