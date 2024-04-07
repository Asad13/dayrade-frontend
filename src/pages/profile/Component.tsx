import Head from '@src/components/common/Head';
import PageContainer from '@components/common/pages/PageContainer';
import PageHeading from '@components/common/pages/PageHeading';

const title = 'Profile';

export const Component = () => {
  return (
    <>
      <Head title={title} />
      <PageContainer>
        <PageHeading title={title} />
      </PageContainer>
    </>
  );
};

Component.displayName = 'Profile';
