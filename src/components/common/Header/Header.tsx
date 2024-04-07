import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className="tw-fixed tw-h-16 tw-w-full tw-border-b tw-bg-background-light dark:tw-bg-background-dark">
        <nav className="tw-my-4">
          <div>
            <span className="tw-mx-4 tw-rounded-xl tw-border-2 tw-border-red-800 tw-px-4 tw-py-2">
              <Link to="/" className="tw-text-blue-700">
                Home
              </Link>
            </span>
          </div>
        </nav>
      </header>
      <div className="tw-pt-16"></div>
    </>
  );
};

export default Header;
