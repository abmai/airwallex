import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders header', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/san francisco/i);
  expect(linkElement).toBeInTheDocument();
});
