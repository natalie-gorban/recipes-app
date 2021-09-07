import { render, screen } from '@testing-library/react';
import Signup from './Signup';

test('renders Signup', () => {
  render(<Signup />);
  const linkElement = screen.getByText(/Signup/i);
  expect(linkElement).toBeInTheDocument();
});
