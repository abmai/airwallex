import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders home page', () => {
  render(<HomePage />);

  const linkElement = screen.getByText(/a better way/i);
  expect(linkElement).toBeInTheDocument();
})

test('renders modal', () => {
  render(<HomePage />);

  expect(screen.queryByRole('dialog')).toBeNull();
  fireEvent.click(screen.getByText('request an invite'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
})