import { useRouteError } from 'react-router-dom';

interface CustomError {
  status?: number;
  statusText?: string;
  message?: string;
  stack?: string;
  // Add any additional properties if needed
}

export default function ErrorPage() {
  const error = useRouteError() as CustomError;
  console.error(error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
