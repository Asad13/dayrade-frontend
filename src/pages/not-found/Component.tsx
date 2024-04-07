import { Link } from 'react-router-dom';
import Head from '@src/components/common/Head';

export const Component = () => {
  return (
    <>
      <Head title="Page Not Found" />
      <div className="tw-flex tw-h-screen tw-w-screen tw-flex-col tw-items-center tw-justify-center">
        <h3>Oops!</h3>
        <h1>404 - Page Not Found</h1>
        <Link to="/" className="tw-text-blue-700 tw-underline">
          Go to home
        </Link>
      </div>
    </>
  );
};

Component.displayName = 'NotFound';
