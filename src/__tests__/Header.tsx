import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders header', () => {
  render(<Header />);
  expect(screen.getByText(/broccoli & co./i)).toBeInTheDocument();
});
