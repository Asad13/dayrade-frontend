import { axiosPrivate } from '@src/utils/axiosInstances';
import { queryOptions, type QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchData = async (id: string) => {
  try {
    const { data } = await axiosPrivate.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    return data as Post;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postQuery = (id: string) =>
  queryOptions({
    queryKey: ['posts', id],
    queryFn: () => fetchData(id),
  });

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
      throw new Error('No post ID provided');
    }
    await queryClient.ensureQueryData(postQuery(params.id as string));
    return { id: params.id };
  };
