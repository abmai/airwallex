import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('renders footer', () => {
  render(<Footer />);
  expect(screen.getByText(/san francisco/i)).toBeInTheDocument();
});
