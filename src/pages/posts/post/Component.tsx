import Head from '@src/components/common/Head';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { postQuery, loader } from './loader';

const title = 'Post';

export const Component = () => {
  const { id } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const { data } = useSuspenseQuery(postQuery(id));

  return (
    <>
      <Head title={data !== undefined ? data.title : title} />
      <h1 className="tw-m-4">Post Page</h1>
      <main className="tw-m-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
        {data !== undefined && (
          <div className="tw-my-2 tw-w-full tw-max-w-[400px] tw-rounded-lg tw-border-2 tw-p-4">
            <h3>{data.title}</h3>
            <p>Post Id: {data.id}</p>
            <p>User Id: {data.userId}</p>
            <p>{data.body}</p>
          </div>
        )}
      </main>
    </>
  );
};

Component.displayName = 'Posts';
