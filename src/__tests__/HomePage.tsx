import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

test('renders home page', () => {
  render(<HomePage />);
  expect(screen.getByText(/a better way/i)).toBeInTheDocument();
});

test('renders modal', () => {
  render(<HomePage />);

  expect(screen.queryByRole('dialog')).toBeNull();
  fireEvent.click(screen.getByText(/request an invite/i));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
