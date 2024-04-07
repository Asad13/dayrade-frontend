import { useRouteError, Link, useNavigate } from 'react-router-dom';

const ErrorComp = () => {
  const error = useRouteError();
  if (import.meta.env.DEV) console.error(error);

  const navigate = useNavigate();

  return (
    <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4">
      <p className="tw-text-center tw-text-red-600">Something went wrong...</p>
      <div>
        <p>
          <button onClick={() => navigate(0)}>Refresh Page</button>
        </p>
        <p>
          <Link to="/">Go to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorComp;
