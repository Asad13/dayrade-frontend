import Head from '@src/components/common/Head';

interface LoaderProps {
  fullPage?: boolean;
  title?: string;
}

const Loader = ({ fullPage = true, title }: LoaderProps) => {
  return (
    <>
      {title !== undefined && <Head title={title} />}
      <div className={`${!fullPage ? 'not-full-page' : ''}`}>
        <div className={`loader-container ${fullPage ? 'full-page' : ''}`}>
          <span className="loader"></span>
        </div>
      </div>
    </>
  );
};

export default Loader;
