import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import axios from 'axios';

import Button from './Button';

export const AUTH_API =
  'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

interface FormInputs {
  fullName: string;
  email: string;
  confirmEmail: string;
}

interface RequestState {
  status: 'requesting' | 'success' | 'failure';
  errorMessage?: string;
}

interface Props {
  onFinish: () => void;
  onSubmitStart?: () => void;
  onSubmitFinish?: () => void;
}

const schema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, 'Name must be at least 3 characters.')
    .required('Name is required.'),
  email: yup
    .string()
    .email('Must be a valid email.')
    .required('Must be a valid email.'),
  confirmEmail: yup
    .string()
    // Value is either null or must match previous email field
    .oneOf([null, yup.ref('email')], 'Emails must match.'),
});

export default function RequestInviteForm(props: Props) {
  const [requestState, setRequestState] = useState<RequestState | undefined>();
  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const isSuccess = requestState?.status === 'success';

  const onSubmit = handleSubmit(async (data: FormInputs) => {
    const { fullName, email } = data;
    // Trigger on submit start props if possible
    props.onSubmitStart?.();

    setRequestState({
      status: 'requesting',
    });
    try {
      await axios({
        method: 'POST',
        url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
        data: {
          name: fullName,
          email,
        },
      });
      setRequestState({
        status: 'success',
      });
    } catch ({ message, response }) {
      setRequestState({
        status: 'failure',
        // Grab the response error message if there is one
        // Otherwise default to the message in the generic error object
        errorMessage: response?.data?.errorMessage ?? message,
      });
    } finally {
      props.onSubmitFinish?.();
    }
  });

  function renderSuccess() {
    return (
      <div className="flex flex-col h-56">
        <h1 className="text-center text-2xl font-medium">All done!</h1>
        <p className="text-center text-md mt-4">
          Thank you for joining the waitlist. We will let you know as soon as
          you are able to try the app.
        </p>
        <div className="flex-1" />
        <Button onClick={props.onFinish}>
          <span className="text-lg font-medium">Ok</span>
        </Button>
      </div>
    );
  }

  function renderForm() {
    return (
      <div className="flex flex-col h-128">
        <h1 className="text-center text-2xl font-medium">Request an invite</h1>
        <form onSubmit={onSubmit} className="flex flex-col mt-8 flex-1">
          <label htmlFor="fullName" className="text-sm">
            Full Name <span>(required)</span>
          </label>
          <input
            id="fullName"
            className="bg-input-background mt-0.5 p-3 placeholder-secondary rounded-lg focus:outline-none focus-visible:ring-2"
            {...register('fullName')}
          />
          <p className="text-red-600 text-sm">{errors.fullName?.message}</p>

          <label htmlFor="email" className="text-sm mt-2">
            Email <span>(required)</span>
          </label>
          <input
            id="email"
            className="bg-input-background mt-0.5 p-3 placeholder-secondary rounded-lg focus:outline-none focus-visible:ring-2"
            {...register('email')}
          />
          <p className="text-red-600 text-sm">{errors.email?.message}</p>

          <label htmlFor="confirmEmail" className="text-sm mt-2">
            Confirm Email
          </label>
          <input
            id="confirmEmail"
            className="bg-input-background mt-0.5 p-3 placeholder-secondary rounded-lg focus:outline-none focus-visible:ring-2"
            {...register('confirmEmail')}
          />
          <p className="text-red-600 text-sm">{errors.confirmEmail?.message}</p>

          <div className="flex-1" />

          <p className="text-red-600 text-sm text-center mb-2">
            {requestState?.errorMessage}
          </p>
          <Button
            type="submit"
            disabled={requestState?.status === 'requesting'}
          >
            <span className="text-lg font-medium">
              {requestState?.status === 'requesting' ? 'Sending...' : 'Submit'}
            </span>
          </Button>
        </form>
      </div>
    );
  }

  return isSuccess ? renderSuccess() : renderForm();
}
