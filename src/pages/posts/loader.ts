import { axiosPrivate } from '@src/utils/axiosInstances';
import { queryOptions, type QueryClient } from '@tanstack/react-query';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchData = async () => {
  try {
    const { data } = await axiosPrivate.get(
      'https://jsonplaceholder.typicode.com/posts',
    );

    return data as Array<Post>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postsQuery = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: fetchData,
  });

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(postsQuery());
  return null;
};
