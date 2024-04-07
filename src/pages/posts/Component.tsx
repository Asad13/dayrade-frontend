import Head from '@src/components/common/Head';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useLoaderData } from 'react-router-dom';
import { postsQuery, loader } from './loader';

const title = 'Posts';

export const Component = () => {
  useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  const { data } = useSuspenseQuery(postsQuery());

  return (
    <>
      <Head title={title} />
      <h1 className="tw-m-4">Posts Page</h1>
      <main className="tw-m-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
        {data.length !== undefined ? (
          data.map((post) => (
            <div
              className="tw-my-2 tw-w-full tw-max-w-[400px] tw-rounded-lg tw-border-2 tw-p-4"
              key={post.id}
            >
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
                <p>Post Id: {post.id}</p>
                <p>User Id: {post.userId}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </main>
    </>
  );
};

Component.displayName = 'Posts';
