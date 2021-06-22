import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders header', () => {
  render(<Header />);
  const linkElement = screen.getByText(/broccoli & co./i);
  expect(linkElement).toBeInTheDocument();
});
