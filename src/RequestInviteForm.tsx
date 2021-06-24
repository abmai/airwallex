import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

interface FormInputs {
  fullName: string;
  email: string;
  confirmEmail: string;
}

interface RequestState {
  status: 'requesting' | 'success' | 'failure',
  errorMessage?: string
}

interface Props {
  onFinish: () => void
}

const schema = yup.object().shape({
  fullName: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Must be a valid email.")
    .required("Email is required."),
  confirmEmail: yup
    .string()
    // Value is either null or must match previous email field
    .oneOf([null, yup.ref("email")], "Emails must match."),
});

export default function RequestInviteForm(props: Props) {
  const [requestState, setRequestState] = useState<RequestState | undefined>();

  const { register, handleSubmit, formState } = useForm<FormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = handleSubmit((data: FormInputs) => {
    // TODO: implement
    setRequestState({status: 'failure', errorMessage: 'Something went wrong!'});
  });

  function renderSuccess() {
    return (
      <>
        <h1>All done!</h1>
        <p>Thank you for joining the waitlist. We will let you know as soon as you are able to try the app.</p>
        <button onClick={() => props.onFinish()}>Ok</button>
      </>
    )
  }

  function renderForm() {
    return (
      <>
        <h1>Request an Invite</h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <label htmlFor="fullName">
            <input
              id="fullName"
              placeholder="Full Name"
              {...register("fullName")}
            />
          </label>
          <p>{errors.fullName?.message}</p>

          <label htmlFor="email">
            <input id="email" placeholder="Email" {...register("email")} />
          </label>
          <p>{errors.email?.message}</p>

          <label htmlFor="confirmEmail">
            <input
              id="confirmEmail"
              placeholder="Confirm Email"
              {...register("confirmEmail")}
            />
          </label>
          <p>{errors.confirmEmail?.message}</p>

          <input type="submit" />
          <p>{requestState?.errorMessage}</p>
        </form>
      </>
    );
  }

  return requestState?.status === 'success' ? renderSuccess() : renderForm();

}
