import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../DB/supabase';

const LoginPage = () => {
  const navigate = useNavigate();

  async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevents the default form submission

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const loginData = await login({ email, password });
    if (loginData) {
      // Use the setToken function to update the auth context
      navigate('/');
    } else {
      navigate('/login'); // or redirect to another route
    }
  }

  return (
    <form
      id='login-form'
      onSubmit={onFormSubmit}
      className='flex flex-col px-8 py-2 gap-2 justify-center items-center h-full '
    >
      <input
        aria-label='email'
        type='text'
        name='email'
        placeholder='Email'
        className='bg-secondary px-4 py-2 max-w-xs placeholder:text-primary'
      ></input>
      <input
        aria-label='Password'
        type='password'
        name='password'
        placeholder='Password'
        className='bg-secondary px-4 py-2 max-w-xs placeholder:text-primary'
      ></input>
      <div className='flex justify-around max-w-xs w-full px-4 py-2'>
        <button type='submit'>Login</button>
        <button disabled={true}>Sign-Up</button>
      </div>
    </form>
  );
};

export default LoginPage;
