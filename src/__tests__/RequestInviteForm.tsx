import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestInviteForm from '../RequestInviteForm';

test('renders form', () => {
  render(<RequestInviteForm />);

  expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
})

test('renders required errors', async () => {
  render(<RequestInviteForm />);

  act(() => {
    userEvent.click(screen.getByPlaceholderText(/full name/i));
    userEvent.click(screen.getByPlaceholderText(/^email/i));
    userEvent.click(screen.getByPlaceholderText(/confirm email/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  })
})

test('validate email', async () => {
  render(<RequestInviteForm />);

  act(() => {
    userEvent.type(screen.getByPlaceholderText(/^email/i), 'hello');
    userEvent.click(screen.getByPlaceholderText(/confirm email/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  })
})

test('matching confirm email', async () => {
  render(<RequestInviteForm />);

  act(() => {
    userEvent.type(screen.getByPlaceholderText(/^email/i), 'hello@gmail.com');
    userEvent.type(screen.getByPlaceholderText(/confirm email/i), 'hell@gmail.com');
    userEvent.click(screen.getByPlaceholderText(/^email/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/emails must match/i)).toBeInTheDocument();
  })
})