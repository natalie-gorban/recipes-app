import { render, screen } from '@testing-library/react';
import AppHeader from './AppHeader';

test('renders Signup', () => {
  render(<AppHeader />);
  const linkElement = screen.getByText(/Signup/i);
  expect(linkElement).toBeInTheDocument();
});
