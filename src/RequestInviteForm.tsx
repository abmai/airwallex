import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface FormInputs {
  fullName: string
  email: string
  confirmEmail: string
}

const schema = yup.object().shape({
  fullName: yup.string().required('Name is required.'),
  email: yup.string().email().required('Email is required.'),
  confirmEmail: yup.string().oneOf([null, yup.ref('email')], 'Emails must match.')
});

export default function RequestInviteForm() {
  const { register, handleSubmit, formState } = useForm<FormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const {errors} = formState;

  const onSubmit = handleSubmit((data: FormInputs) => {
    // TODO: implement
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="fullName">
        <input id="fullName" placeholder="Full Name" {...register("fullName")} />
      </label>
      <p>{errors.fullName?.message}</p>

      <label htmlFor="email">
        <input id="email" placeholder="Email" {...register("email")} />
      </label>
      <p>{errors.email?.message}</p>

      <label htmlFor="confirmEmail">
        <input id="confirmEmail" placeholder="Confirm Email" {...register("confirmEmail")} />
      </label>
      <p>{errors.confirmEmail?.message}</p>

      <input type="submit" />
    </form>
  );
}