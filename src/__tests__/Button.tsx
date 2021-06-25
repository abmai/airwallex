import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button', () => {
  render(<Button>My Label</Button>);
  expect(screen.getByText(/my label/i)).toBeInTheDocument();
});
