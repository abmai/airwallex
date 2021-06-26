import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestInviteForm, { AUTH_API } from '../RequestInviteForm';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const success = setupServer(
  rest.post(AUTH_API, (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
);

const failure = setupServer(
  rest.post(AUTH_API, (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({
        errorMessage: 'Request failure',
      }),
    );
  }),
);

test('renders form', () => {
  render(<RequestInviteForm onFinish={() => {}} />);

  expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
});

test('renders required errors', async () => {
  render(<RequestInviteForm onFinish={() => {}} />);

  act(() => {
    userEvent.click(screen.getByText(/submit/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/must be a valid email/i)).toBeInTheDocument();
  });
});

test('validate email', async () => {
  render(<RequestInviteForm onFinish={() => {}} />);

  act(() => {
    userEvent.type(screen.getByLabelText(/^email/i), 'hello');
    userEvent.click(screen.getByText(/submit/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });
});

test('matching confirm email', async () => {
  render(<RequestInviteForm onFinish={() => {}} />);

  act(() => {
    userEvent.type(screen.getByLabelText(/^email/i), 'hello@gmail.com');
    userEvent.type(screen.getByLabelText(/confirm email/i), 'hell@gmail.com');
    userEvent.click(screen.getByText(/^submit/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/emails must match/i)).toBeInTheDocument();
  });
});

test('successful submit', async () => {
  success.listen();

  render(<RequestInviteForm onFinish={() => {}} />);

  act(() => {
    userEvent.type(screen.getByLabelText(/^full name/i), 'anh');
    userEvent.type(screen.getByLabelText(/^email/i), 'hello@gmail.com');
    userEvent.type(screen.getByLabelText(/confirm email/i), 'hello@gmail.com');
    userEvent.click(screen.getByText(/^submit/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/all done/i)).toBeInTheDocument();
    success.resetHandlers();
    success.close();
  });
});

test('show server error', async () => {
  failure.listen();

  render(<RequestInviteForm onFinish={() => {}} />);

  act(() => {
    userEvent.type(screen.getByLabelText(/^full name/i), 'anh');
    userEvent.type(screen.getByLabelText(/^email/i), 'hello@gmail.com');
    userEvent.type(screen.getByLabelText(/confirm email/i), 'hello@gmail.com');
    userEvent.click(screen.getByText(/^submit/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/request failure/i)).toBeInTheDocument();
    failure.resetHandlers();
    failure.close();
  });
});
